import { useEffect, useState } from 'react';
import { CoachFire } from '../components/CoachFire';
import { DayTransition } from '../components/DayTransition';
import { MarketHighlights } from '../components/MarketHighlights';
import { MarketIndicator } from '../components/MarketIndicator';
import { QuoteCard } from '../components/QuoteCard';
import { SimulationPanel } from '../components/SimulationPanel';
import rashidMug from '../assets/rashid-mug.png';
import { formatChange, initialQuotes, moveMarket, movePrice } from '../lib/market';
import { initialPortfolio, tradeStock, type TradeAction } from '../lib/portfolio';
import { playBuySound, playEnterSound, playSellSound } from '../lib/sounds';

export function HomePage() {
  const [started, setStarted] = useState(false);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [indexPrice, setIndexPrice] = useState(5469.3);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [tradeMessage, setTradeMessage] = useState('Готов к первой сделке');
  const [day, setDay] = useState(1);
  const [isDayTransitionVisible, setIsDayTransitionVisible] = useState(false);
  const [spyBuyPrice, setSpyBuyPrice] = useState<number | null>(null);

  useEffect(() => {
    const marketTimer = window.setInterval(() => {
      setQuotes((currentQuotes) => moveMarket(currentQuotes));
      setIndexPrice((currentPrice) => movePrice(currentPrice));
    }, 1000);

    return () => window.clearInterval(marketTimer);
  }, []);

  useEffect(() => {
    const dayTimer = window.setInterval(() => {
      setDay((currentDay) => currentDay + 1);
      setPortfolio((currentPortfolio) => ({
        ...currentPortfolio,
        balance: currentPortfolio.balance + 500,
      }));
      setTradeMessage('Награда за новый день: +$500');
      setIsDayTransitionVisible(true);
    }, 120000);

    return () => window.clearInterval(dayTimer);
  }, []);

  useEffect(() => {
    if (!isDayTransitionVisible) return;

    const transitionTimer = window.setTimeout(() => {
      setIsDayTransitionVisible(false);
    }, 2600);

    return () => window.clearTimeout(transitionTimer);
  }, [isDayTransitionVisible]);

  function handleTrade(quote: typeof quotes[number], action: TradeAction) {
    const result = tradeStock(portfolio, quote, action);
    setPortfolio(result.portfolio);
    setTradeMessage(result.message);
    if (quote.symbol === 'SPY' && action === 'buy' && result.portfolio !== portfolio && spyBuyPrice === null) {
      setSpyBuyPrice(quote.price);
    }
    if (quote.symbol === 'SPY' && action === 'sell' && result.portfolio !== portfolio && (result.portfolio.holdings.SPY ?? 0) === 0) {
      setSpyBuyPrice(null);
    }
    if (result.portfolio !== portfolio) {
      if (action === 'buy') playBuySound();
      else playSellSound();
    }
  }

  function startSimulation() {
    playEnterSound();
    setStarted(true);
  }

  const portfolioValue = portfolio.balance + quotes.reduce(
    (total, quote) => total + quote.price * (portfolio.holdings[quote.symbol] ?? 0),
    0,
  );
  const spyQuote = quotes.find((quote) => quote.symbol === 'SPY');
  const canSellSpyForProfit = spyBuyPrice !== null && spyQuote !== undefined && spyQuote.price > spyBuyPrice;

  return (
    <main className="market-page">
      <DayTransition day={day} isVisible={isDayTransitionVisible} />
      <header className="market-header"><span className="market-logo">NORTH<span>•</span>MARKET</span><span className="market-status">● Рынок открыт · LIVE</span></header>
      {!started ? (
        <section className="market-welcome">
          <div className="welcome-content">
            <p className="market-kicker">ЛИЧНЫЙ ТРЕЙДИНГ-ТЕРМИНАЛ</p>
            <h1>Следи за<br /><em>рынком.</em></h1>
            <p>Котировки, динамика и всё важное — в одном понятном месте.</p>
            <button className="start-button" onClick={startSimulation}>Начать <span>→</span></button>
            <p className="sound-tip">🔊 Совет: играй со звуком</p>
            <MarketHighlights />
          </div>
          <img className="rashid-mug" src={rashidMug} alt="Оранжевая кружка Rashid" />
        </section>
      ) : (
        <section className="market-dashboard">
          <div className="market-title"><div><p className="market-kicker">ОБЗОР РЫНКА</p><h1>Сегодня</h1></div><button className="back-button" onClick={() => setStarted(false)}>←</button></div>
          <div className="market-grid">
            <article className="chart-card"><div><span>S&P 500 · обновляется каждую секунду</span><strong>{indexPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><b className={indexPrice < 5469.3 ? 'negative' : ''}>{formatChange(indexPrice, 5469.3)}</b></div><svg viewBox="0 0 600 190" aria-label="График рынка"><path d="M0 161 L45 143 L78 150 L121 102 L158 125 L202 91 L241 107 L282 58 L323 83 L366 70 L409 28 L449 46 L494 19 L537 35 L600 4 V190 H0Z" /><polyline points="0,161 45,143 78,150 121,102 158,125 202,91 241,107 282,58 323,83 366,70 409,28 449,46 494,19 537,35 600,4" /></svg></article>
            <article className="balance-card"><span>ТВОЙ БАЛАНС</span><strong>${portfolio.balance.toFixed(2)}</strong><p>{tradeMessage}</p></article>
          </div>
          <MarketIndicator price={indexPrice} />
          <SimulationPanel day={day} portfolioValue={portfolioValue} />
          <CoachFire canSellForProfit={canSellSpyForProfit} day={day} hasBoughtSpy={(portfolio.holdings.SPY ?? 0) > 0} portfolioValue={portfolioValue} />
          <section className="quotes"><h2>Котировки</h2>{quotes.map((quote) => <QuoteCard coachAction={quote.symbol !== 'SPY' ? null : (portfolio.holdings.SPY ?? 0) === 0 ? 'buy' : canSellSpyForProfit ? 'sell' : null} key={quote.symbol} onTrade={handleTrade} quote={quote} shares={portfolio.holdings[quote.symbol] ?? 0} />)}</section>
        </section>
      )}
    </main>
  );
}
