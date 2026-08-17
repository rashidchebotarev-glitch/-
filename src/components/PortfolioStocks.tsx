import { useState } from 'react';
import type { MarketQuote } from '../lib/market';
import { getPositionAnalytics } from '../lib/portfolioAnalytics';
import type { Portfolio, TradeAction } from '../lib/portfolio';

type PortfolioStocksProps = {
  onTrade: (quote: MarketQuote, action: TradeAction) => void;
  portfolio: Portfolio;
  quotes: MarketQuote[];
};

export function PortfolioStocks({ onTrade, portfolio, quotes }: PortfolioStocksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ownedStocks = quotes.filter((quote) => (portfolio.holdings[quote.symbol] ?? 0) > 0);
  const portfolioValue = portfolio.balance + ownedStocks.reduce(
    (total, quote) => total + quote.price * (portfolio.holdings[quote.symbol] ?? 0),
    0,
  );

  return (
    <section className="portfolio-stocks">
      <button className="portfolio-button" onClick={() => setIsOpen((current) => !current)}>
        <span>💼 Мои акции</span>
        <b>{ownedStocks.length}</b>
      </button>
      {isOpen && (
        <div className="portfolio-list">
          <p className="market-kicker">ТВОЙ ПОРТФЕЛЬ</p>
          {ownedStocks.length === 0 ? (
            <p className="portfolio-empty">Пока пусто. Купи первую акцию в списке котировок.</p>
          ) : (
            <div className="portfolio-table-wrap">
              <table className="portfolio-table">
                <thead><tr><th>Акция</th><th>Стоимость</th><th>Рост / падение</th><th>Доля портфеля</th><th /></tr></thead>
                <tbody>{ownedStocks.map((quote) => {
                  const shares = portfolio.holdings[quote.symbol] ?? 0;
                  const analytics = getPositionAnalytics(portfolio, quote, portfolioValue);
                  const isProfit = analytics.profitValue >= 0;
                  return (
                    <tr key={quote.symbol}>
                      <td><strong>{quote.symbol}</strong><span>{shares} шт. · ср. ${analytics.averagePrice.toFixed(2)}</span></td>
                      <td><b>${analytics.currentValue.toFixed(2)}</b></td>
                      <td><em className={isProfit ? 'profit' : 'loss'}>{isProfit ? '+' : ''}{analytics.profitPercent.toFixed(2)}%<small>{isProfit ? '+' : '-'}${Math.abs(analytics.profitValue).toFixed(2)}</small></em></td>
                      <td><div className="allocation-bar" aria-label={`Доля в портфеле: ${analytics.allocationPercent.toFixed(1)}%`}><i style={{ width: `${Math.min(analytics.allocationPercent, 100)}%` }} /></div><small>{analytics.allocationPercent.toFixed(1)}%</small></td>
                      <td><button onClick={() => onTrade(quote, 'sell')}>Продать 1</button></td>
                    </tr>
                  );
                })}</tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
