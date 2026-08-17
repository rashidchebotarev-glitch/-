import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { CoachFire } from '../components/CoachFire';
import { AgeSelection } from '../components/AgeSelection';
import { CharacterSelection } from '../components/CharacterSelection';
import { DeviceSelection } from '../components/DeviceSelection';
import { DayTransition } from '../components/DayTransition';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { MarketHighlights } from '../components/MarketHighlights';
import { MarketIndicator } from '../components/MarketIndicator';
import { MissionHook } from '../components/MissionHook';
import { MissionPanel } from '../components/MissionPanel';
import { MissionPopup } from '../components/MissionPopup';
import { MarketNewsPopup } from '../components/MarketNewsPopup';
import { QuoteCard } from '../components/QuoteCard';
import { QuoteSearch } from '../components/QuoteSearch';
import { PortfolioStocks } from '../components/PortfolioStocks';
import { PlayerLevel } from '../components/PlayerLevel';
import { SimulationPanel } from '../components/SimulationPanel';
import { StoryIntro } from '../components/StoryIntro';
import rashidMug from '../assets/rashid-mug.png';
import { formatChange, initialQuotes, memberQuotes } from '../lib/market';
import { initialPortfolio, tradeStock, type TradeAction } from '../lib/portfolio';
import { createMarketNews, type MarketNews } from '../lib/news';
import { playBuySound, playEnterSound, playSellSound } from '../lib/sounds';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { PlayerCharacter } from '../lib/player';
import type { GameDevice } from '../lib/device';
import { useMarketSimulation } from '../hooks/useMarketSimulation';
import { advancedMissions, missions } from '../lib/missions';

export function HomePage() {
  const [started, setStarted] = useState(false);
  const [isAgeSelectionVisible, setIsAgeSelectionVisible] = useState(false);
  const [isCharacterSelectionVisible, setIsCharacterSelectionVisible] = useState(false);
  const [isDeviceSelectionVisible, setIsDeviceSelectionVisible] = useState(false);
  const [isStoryIntroVisible, setIsStoryIntroVisible] = useState(false);
  const [character, setCharacter] = useState<PlayerCharacter | null>(null);
  const [device, setDevice] = useState<GameDevice | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const { indexPrice, quotes, setQuotes } = useMarketSimulation();
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [tradeMessage, setTradeMessage] = useState('Готов к первой сделке');
  const [day, setDay] = useState(1);
  const [isDayTransitionVisible, setIsDayTransitionVisible] = useState(false);
  const [isFirstMissionVisible, setIsFirstMissionVisible] = useState(false);
  const [marketNews, setMarketNews] = useState<MarketNews | null>(null);
  const [spyBuyPrice, setSpyBuyPrice] = useState<number | null>(null);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [experience, setExperience] = useState(0);
  const [activeMission, setActiveMission] = useState(0);
  const [health, setHealth] = useState(100);
  const [ageGroup, setAgeGroup] = useState<'junior' | 'senior'>('junior');
  const [searchQuery, setSearchQuery] = useState('');

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
    if (action === 'buy' && result.portfolio !== portfolio) {
      const stockCount = Object.entries(result.portfolio.holdings).filter(([symbol, shares]) => symbol !== 'BND' && shares > 0).length;
      const currentMission = (ageGroup === 'senior' ? advancedMissions : missions)[activeMission];
      const isComplete = (activeMission === 0)
        || (activeMission === 1 && quote.symbol === 'BND')
        || (activeMission === 2 && stockCount >= 3)
        || (activeMission === 3 && (quote.symbol === 'TSLA' || quote.symbol === 'MSFT'))
        || (activeMission === 4 && ['AAPL', 'MSFT', 'DIS'].includes(quote.symbol))
        || (activeMission === 8 && quote.symbol === 'SPY')
        || (activeMission === 9 && portfolioValue >= 20000);
      if (isComplete && currentMission) {
        setExperience((currentExperience) => currentExperience + currentMission.xp);
        setActiveMission((currentMissionIndex) => currentMissionIndex + 1);
        setHealth((currentHealth) => Math.min(100, currentHealth + 10));
        setTradeMessage(`${currentMission.badge} получен! ${currentMission.coach}`);
      }
    }
  }

  function startSimulation() {
    playEnterSound();
    setIsAgeSelectionVisible(true);
  }

  function selectAge(group: 'junior' | 'senior') {
    setAgeGroup(group);
    setExperience(group === 'senior' ? 300 : 0);
    setIsAgeSelectionVisible(false);
    setIsDeviceSelectionVisible(true);
  }

  function selectDevice(selectedDevice: GameDevice) {
    setDevice(selectedDevice);
    setIsDeviceSelectionVisible(false);
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
  const missionList = ageGroup === 'senior' ? advancedMissions : missions;
  const visibleQuotes = quotes.filter((quote) => {
    const query = searchQuery.trim().toLowerCase();
    return query === '' || [quote.symbol, quote.name, quote.exchange].some((value) => value.toLowerCase().includes(query));
  });

  return (
    <main className={`market-page ${device?.id === 'phone' ? 'phone-layout' : ''}`}>
      <div className="background-orbs" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
      <DayTransition day={day} isVisible={isDayTransitionVisible} />
      {started && <MissionPopup isVisible={isFirstMissionVisible} onClose={() => setIsFirstMissionVisible(false)} />}
      <header className="market-header"><span className="market-logo">NORTH<span>•</span>MARKET</span><div className="header-tools">{character && <span className="player-badge">{character.avatar} {character.name}</span>}<span className="market-status">● Рынок открыт · LIVE</span></div></header>
      <MarketNewsPopup news={marketNews} onClose={() => setMarketNews(null)} />
      {!started && !isAgeSelectionVisible && !isDeviceSelectionVisible && !isCharacterSelectionVisible && !isStoryIntroVisible ? (
        <section className="market-welcome">
          <div className="welcome-content">
            <p className="market-kicker">ЛИЧНЫЙ ТРЕЙДИНГ-ТЕРМИНАЛ</p>
            <h1><em>Разбоготей.</em></h1>
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
      ) : isDeviceSelectionVisible ? (
        <DeviceSelection onSelect={selectDevice} />
      ) : isCharacterSelectionVisible ? (
        <CharacterSelection onSelect={selectCharacter} />
      ) : isStoryIntroVisible && character !== null ? (
        <StoryIntro character={character} onStart={startMission} />
      ) : (
        <section className="market-dashboard">
          <div className="market-title"><div><p className="market-kicker">ОБЗОР РЫНКА</p><h1>Сегодня</h1></div><button className="back-button" onClick={() => setStarted(false)}>←</button></div>
          <div className="dashboard-layout">
          <DashboardSidebar />
          <div className="dashboard-content">
          <div className="market-grid">
            <article className="chart-card"><div><span>S&P 500 · обновляется каждую секунду</span><strong>{indexPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><b className={indexPrice < 5469.3 ? 'negative' : ''}>{formatChange(indexPrice, 5469.3)}</b></div><svg viewBox="0 0 600 190" aria-label="График рынка"><path d="M0 161 L45 143 L78 150 L121 102 L158 125 L202 91 L241 107 L282 58 L323 83 L366 70 L409 28 L449 46 L494 19 L537 35 L600 4 V190 H0Z" /><polyline points="0,161 45,143 78,150 121,102 158,125 202,91 241,107 282,58 323,83 366,70 409,28 449,46 494,19 537,35 600,4" /></svg></article>
            <article className="balance-card"><span>ТВОЙ БАЛАНС</span><strong>${portfolio.balance.toFixed(2)}</strong><p>{tradeMessage}</p></article>
          </div>
          <MarketIndicator price={indexPrice} />
          <PlayerLevel experience={experience} isFirstQuestComplete={isTrainingComplete} />
          <div id="missions"><MissionHook day={day} isFirstQuestComplete={isTrainingComplete} portfolioValue={portfolioValue} /></div>
          <MissionPanel activeMission={activeMission} experience={experience} health={health} missionList={missionList} />
          <div id="portfolio"><PortfolioStocks onTrade={handleTrade} portfolio={portfolio} quotes={quotes} /></div>
          <SimulationPanel day={day} portfolioValue={portfolioValue} />
          <CoachFire canSellForProfit={canSellSpyForProfit} day={day} hasBoughtSpy={(portfolio.holdings.SPY ?? 0) > 0} isTrainingComplete={isTrainingComplete} portfolioValue={portfolioValue} />
          <section className="quotes" id="quotes"><div className="quotes-heading"><h2>Котировки</h2><QuoteSearch onChange={setSearchQuery} value={searchQuery} /></div>{visibleQuotes.map((quote) => <QuoteCard coachAction={isTrainingComplete || quote.symbol !== 'SPY' ? null : (portfolio.holdings.SPY ?? 0) === 0 ? 'buy' : canSellSpyForProfit ? 'sell' : null} key={quote.symbol} onTrade={handleTrade} quote={quote} shares={portfolio.holdings[quote.symbol] ?? 0} />)}{visibleQuotes.length === 0 && <p className="quote-search-empty">Ничего не найдено. Попробуй другой запрос.</p>}{isRegistered && <p className="member-market-note">✓ Международный рынок открыт: Китай и Япония</p>}</section>
          </div>
          </div>
        </section>
      )}
    </main>
  );
}
