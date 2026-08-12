import { useEffect, useState } from 'react';
import { Link, useParams } from 'wouter';
import { ForecastCard } from '../components/ForecastCard';
import { findQuote, formatChange, movePrice, type MarketQuote } from '../lib/market';
import { NotFoundPage } from './NotFoundPage';

type StockParams = {
  symbol: string;
};

export function StockPage() {
  const { symbol } = useParams<StockParams>();
  const initialQuote = findQuote(symbol);
  const [quote, setQuote] = useState<MarketQuote | null>(initialQuote ?? null);

  useEffect(() => {
    if (initialQuote === undefined) return;

    setQuote(initialQuote);
    const marketTimer = window.setInterval(() => {
      setQuote((currentQuote) => currentQuote === null
        ? null
        : { ...currentQuote, price: movePrice(currentQuote.price) });
    }, 1000);

    return () => window.clearInterval(marketTimer);
  }, [symbol]);

  if (quote === null) return <NotFoundPage />;

  const change = formatChange(quote.price, quote.startingPrice);

  return (
    <main className="market-page">
      <header className="market-header">
        <Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link>
        <span className="market-status">● Рынок открыт · LIVE</span>
      </header>
      <section className="stock-page">
        <Link className="back-link" href="/">← Все котировки</Link>
        <p className="market-kicker">СТРАНИЦА КОМПАНИИ</p>
        <h1>{quote.symbol}</h1>
        <p className="stock-name">{quote.name}</p>
        <article className="stock-price">
          <span>ТЕКУЩАЯ ЦЕНА · ОБНОВЛЯЕТСЯ КАЖДУЮ СЕКУНДУ</span>
          <strong>${quote.price.toFixed(2)}</strong>
          <b className={change.startsWith('-') ? 'negative' : ''}>{change}</b>
        </article>
        <ForecastCard quote={quote} />
      </section>
    </main>
  );
}
