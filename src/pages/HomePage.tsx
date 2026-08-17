import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CoachFire } from '../components/CoachFire';
import { AgeSelection } from '../components/AgeSelection';
import { CharacterSelection } from '../components/CharacterSelection';
import { DayTransition } from '../components/DayTransition';
import { MarketHighlights } from '../components/MarketHighlights';
import { MarketIndicator } from '../components/MarketIndicator';
import { MissionPopup } from '../components/MissionPopup';
import { MarketNewsPopup } from '../components/MarketNewsPopup';
import { QuoteCard } from '../components/QuoteCard';
import { QuoteSearch } from '../components/QuoteSearch';
import { PortfolioStocks } from '../components/PortfolioStocks';
import { PlayerLevel } from '../components/PlayerLevel';
import { SimulationPanel } from '../components/SimulationPanel';
import { StoryIntro } from '../components/StoryIntro';
import rashidMug from '../assets/rashid-mug.png';
import { formatChange, initialQuotes, memberQuotes, moveMarket, movePrice } from '../lib/market';
import { initialPortfolio, tradeStock, type TradeAction } from '../lib/portfolio';
import { createMarketNews, type MarketNews } from '../lib/news';
import { playBuySound, playEnterSound, playSellSound } from '../lib/sounds';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { PlayerCharacter } from '../lib/player';

export function HomePage() {
  const [started, setStarted] = useState(false);
  const [isAgeSelectionVisible, setIsAgeSelectionVisible] = useState(false);
  const [isCharacterSelectionVisible, setIsCharacterSelectionVisible] = useState(false);
  const [isStoryIntroVisible, setIsStoryIntroVisible] = useState(false);
  const [character, setCharacter] = useState<PlayerCharacter | null>(null);
  const [quotes, setQuotes] = useState(initialQuotes);
  const [isRegistered, setIsRegistered] = useState(false);
  const [indexPrice, setIndexPrice] = useState(5469.3);
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [tradeMessage, setTradeMessage] = useState('Готов к первой сделке');
  const [day, setDay] = useState(1);
  const [isDayTransitionVisible, setIsDayTransitionVisible] = useState(false);
  const [isFirstMissionVisible, setIsFirstMissionVisible] = useState(false);
  const [marketNews, setMarketNews] = useState<MarketNews | null>(null);
  const [spyBuyPrice, setSpyBuyPrice] = useState<number | null>(null);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [experience, setExperience] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const marketTimer = window.setInterval(() => {
      setQuotes((currentQuotes) => moveMarket(currentQuotes));
      setIndexPrice((currentPrice) => movePrice(currentPrice));
    }, 1000);

    return () => window.clearInterval(marketTimer);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    supabase.auth.getSession().then(({ data }) => setIsRegistered(data.session !== null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsRegistered(session !== null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isRegistered) return;
    setQuotes((currentQuotes) => currentQuotes.length === initialQuotes.length
      ? [...currentQuotes, ...memberQuotes]
      : currentQuotes);
  }, [isRegistered]);

  useEffect(() => {
    const dayTimer = window.setInterval(() => {
      setDay((currentDay) => currentDay + 1);
      setTradeMessage('Начался новый игровой день. Следи за рынком!');
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
    if (action === 'buy' && result.portfolio !== portfolio) setIsFirstMissionVisible(false);
    if (action === 'buy' && result.portfolio !== portfolio) setMarketNews(createMarketNews(quote));
    if (quote.symbol === 'SPY' && action === 'buy' && result.portfolio !== portfolio && spyBuyPrice === null) {
      setSpyBuyPrice(quote.price);
    }
    if (!isTrainingComplete && quote.symbol === 'SPY' && action === 'sell' && result.portfolio !== portfolio && (result.portfolio.holdings.SPY ?? 0) === 0) {
      setSpyBuyPrice(null);
      setIsTrainingComplete(true);
      setExperience((currentExperience) => currentExperience + 50);
      setTradeMessage('Квест выполнен! Ты получил +50 XP и достиг 2 уровня.');
    }
    if (result.portfolio !== portfolio) {
      if (action === 'buy') playBuySound();
      else playSellSound();
    }
  }

  function startSimulation() {
    playEnterSound();
    setIsAgeSelectionVisible(true);
  }

  function selectAge() {
    setIsAgeSelectionVisible(false);
    setIsCharacterSelectionVisible(true);
  }

  function selectCharacter(selectedCharacter: PlayerCharacter) {
    setCharacter(selectedCharacter);
    setIsCharacterSelectionVisible(false);
    setIsStoryIntroVisible(true);
  }

  function startMission() {
    setIsStoryIntroVisible(false);
    setStarted(true);
    setIsFirstMissionVisible(true);
  }

  const portfolioValue = portfolio.balance + quotes.reduce(
    (total, quote) => total + quote.price * (portfolio.holdings[quote.symbol] ?? 0),
    0,
  );
  const spyQuote = quotes.find((quote) => quote.symbol === 'SPY');
  const canSellSpyForProfit = spyBuyPrice !== null && spyQuote !== undefined && spyQuote.price > spyBuyPrice;
  const visibleQuotes = quotes.filter((quote) => {
    const query = searchQuery.trim().toLowerCase();
    return query === '' || [quote.symbol, quote.name, quote.exchange].some((value) => value.toLowerCase().includes(query));
  });

  return (
    <main className="market-page">
      <div className="background-orbs" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <DayTransition day={day} isVisible={isDayTransitionVisible} />
      {started && <MissionPopup isVisible={isFirstMissionVisible} onClose={() => setIsFirstMissionVisible(false)} />}
      <header className="market-header"><span className="market-logo">NORTH<span>•</span>MARKET</span><div className="header-tools">{character && <span className="player-badge">{character.avatar} {character.name}</span>}<span className="market-status">● Рынок открыт · LIVE</span></div></header>
      <MarketNewsPopup news={marketNews} onClose={() => setMarketNews(null)} />
      {!started && !isAgeSelectionVisible && !isCharacterSelectionVisible && !isStoryIntroVisible ? (
        <section className="market-welcome">
          <div className="welcome-content">
            <p className="market-kicker">ЛИЧНЫЙ ТРЕЙДИНГ-ТЕРМИНАЛ</p>
            <h1>Следи за<br /><em>рынком.</em></h1>
            <p>Котировки, динамика и всё важное — в одном понятном месте.</p>
            <button className="start-button" onClick={startSimulation}>Начать игру <span>→</span></button>
            <Link className="registration-button" href="/auth">Регистрация</Link>
            <p className="registration-tip">✨ Зарегистрируйся, чтобы открыть акции Китая и Японии</p>
            <p className="sound-tip">🔊 Совет: играй со звуком</p>
            <MarketHighlights />
          </div>
          <img className="rashid-mug" src={rashidMug} alt="Оранжевая кружка Rashid" />
        </section>
      ) : isAgeSelectionVisible ? (
        <AgeSelection onSelect={selectAge} />
      ) : isCharacterSelectionVisible ? (
        <CharacterSelection onSelect={selectCharacter} />
      ) : isStoryIntroVisible && character !== null ? (
        <StoryIntro character={character} onStart={startMission} />
      ) : (
        <section className="market-dashboard">
          <div className="market-title"><div><p className="market-kicker">ОБЗОР РЫНКА</p><h1>Сегодня</h1></div><button className="back-button" onClick={() => setStarted(false)}>←</button></div>
          <div className="market-grid">
            <article className="chart-card"><div><span>S&P 500 · обновляется каждую секунду</span><strong>{indexPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><b className={indexPrice < 5469.3 ? 'negative' : ''}>{formatChange(indexPrice, 5469.3)}</b></div><svg viewBox="0 0 600 190" aria-label="График рынка"><path d="M0 161 L45 143 L78 150 L121 102 L158 125 L202 91 L241 107 L282 58 L323 83 L366 70 L409 28 L449 46 L494 19 L537 35 L600 4 V190 H0Z" /><polyline points="0,161 45,143 78,150 121,102 158,125 202,91 241,107 282,58 323,83 366,70 409,28 449,46 494,19 537,35 600,4" /></svg></article>
            <article className="balance-card"><span>ТВОЙ БАЛАНС</span><strong>${portfolio.balance.toFixed(2)}</strong><p>{tradeMessage}</p></article>
          </div>
          <MarketIndicator price={indexPrice} />
          <PlayerLevel experience={experience} isFirstQuestComplete={isTrainingComplete} />
          <PortfolioStocks onTrade={handleTrade} portfolio={portfolio} quotes={quotes} />
          <SimulationPanel day={day} portfolioValue={portfolioValue} />
          <CoachFire canSellForProfit={canSellSpyForProfit} day={day} hasBoughtSpy={(portfolio.holdings.SPY ?? 0) > 0} isTrainingComplete={isTrainingComplete} portfolioValue={portfolioValue} />
          <section className="quotes"><div className="quotes-heading"><h2>Котировки</h2><QuoteSearch onChange={setSearchQuery} value={searchQuery} /></div>{visibleQuotes.map((quote) => <QuoteCard coachAction={isTrainingComplete || quote.symbol !== 'SPY' ? null : (portfolio.holdings.SPY ?? 0) === 0 ? 'buy' : canSellSpyForProfit ? 'sell' : null} key={quote.symbol} onTrade={handleTrade} quote={quote} shares={portfolio.holdings[quote.symbol] ?? 0} />)}{visibleQuotes.length === 0 && <p className="quote-search-empty">Ничего не найдено. Попробуй другой запрос.</p>}{isRegistered && <p className="member-market-note">✓ Международный рынок открыт: Китай и Япония</p>}</section>
        </section>
      )}
    </main>
  );
}
