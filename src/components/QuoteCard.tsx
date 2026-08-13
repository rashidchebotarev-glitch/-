import { Link } from 'wouter';
import { formatChange, type MarketQuote } from '../lib/market';
import type { TradeAction } from '../lib/portfolio';

type QuoteCardProps = {
  coachAction: TradeAction | null;
  onTrade: (quote: MarketQuote, action: TradeAction) => void;
  quote: MarketQuote;
  shares: number;
};

export function QuoteCard({ coachAction, onTrade, quote, shares }: QuoteCardProps) {
  const change = formatChange(quote.price, quote.startingPrice);

  return (
    <article className="quote">
      <div>
        <div className="quote-company-row">
          <img className="company-logo" src={`https://www.google.com/s2/favicons?domain=${quote.domain}&sz=64`} alt="" />
          <Link className="quote-company" href={`/stocks/${quote.symbol}`}>
            <strong>{quote.symbol}</strong>
            <span>{quote.name} · {quote.exchange} · Прогноз →</span>
          </Link>
        </div>
        <small>В портфеле: {shares} шт.</small>
      </div>
      <div>
        <strong>${quote.price.toFixed(2)}</strong>
        <b className={change.startsWith('-') ? 'negative' : ''}>{change}</b>
        <div className="trade-actions">
          <div className="coach-button-wrap">
            <button className={`buy-button ${coachAction === 'buy' ? 'coach-target' : ''}`} onClick={() => onTrade(quote, 'buy')}>Купить 1</button>
            {coachAction === 'buy' && <span className="coach-button-arrow">→</span>}
          </div>
          <div className="coach-button-wrap">
            <button className={`sell-button ${coachAction === 'sell' ? 'coach-target' : ''}`} disabled={shares === 0} onClick={() => onTrade(quote, 'sell')}>Продать 1</button>
            {coachAction === 'sell' && <span className="coach-button-arrow">→</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
