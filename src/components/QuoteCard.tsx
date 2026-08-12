import { Link } from 'wouter';
import { formatChange, type MarketQuote } from '../lib/market';
import type { TradeAction } from '../lib/portfolio';

type QuoteCardProps = {
  onTrade: (quote: MarketQuote, action: TradeAction) => void;
  quote: MarketQuote;
  shares: number;
};

export function QuoteCard({ onTrade, quote, shares }: QuoteCardProps) {
  const change = formatChange(quote.price, quote.startingPrice);

  return (
    <article className="quote">
      <div>
        <Link className="quote-company" href={`/stocks/${quote.symbol}`}>
          <strong>{quote.symbol}</strong>
          <span>{quote.name} · Прогноз →</span>
        </Link>
        <small>В портфеле: {shares} шт.</small>
      </div>
      <div>
        <strong>${quote.price.toFixed(2)}</strong>
        <b className={change.startsWith('-') ? 'negative' : ''}>{change}</b>
        <div className="trade-actions">
          <button className="buy-button" onClick={() => onTrade(quote, 'buy')}>Купить 1</button>
          <button className="sell-button" disabled={shares === 0} onClick={() => onTrade(quote, 'sell')}>Продать 1</button>
        </div>
      </div>
    </article>
  );
}
