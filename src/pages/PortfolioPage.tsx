import { Link } from 'wouter';
import { PortfolioStocks } from '../components/PortfolioStocks';
import type { MarketQuote } from '../lib/market';
import { useGameData } from '../lib/gameData';
import { tradeStock, type TradeAction } from '../lib/portfolio';

export function PortfolioPage() {
  const { portfolio, quotes, setPortfolio } = useGameData();
  function trade(quote: MarketQuote, action: TradeAction) { setPortfolio(tradeStock(portfolio, quote, action).portfolio); }
  return <main className="market-page"><header className="market-header"><Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link><span className="market-status">💼 ПОРТФЕЛЬ</span></header><section className="stock-page"><Link className="back-link" href="/">← К обзору рынка</Link><p className="market-kicker">ТВОИ ИНВЕСТИЦИИ</p><h1>Мои акции</h1><PortfolioStocks onTrade={trade} portfolio={portfolio} quotes={quotes} /></section></main>;
}
