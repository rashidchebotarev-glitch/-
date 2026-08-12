import { formatChange } from '../lib/market';

type MarketIndicatorProps = {
  price: number;
};

const openingPrice = 5469.3;

export function MarketIndicator({ price }: MarketIndicatorProps) {
  const change = formatChange(price, openingPrice);
  const isFalling = change.startsWith('-');

  return (
    <aside className="market-indicator">
      <span className="indicator-dot" />
      <div><small>ИНДИКАТОР РЫНКА</small><strong>S&amp;P 500</strong></div>
      <div className="indicator-price"><strong>{price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong><b className={isFalling ? 'negative' : ''}>{change}</b></div>
    </aside>
  );
}
