import { formatChange, type MarketQuote } from '../lib/market';

type ForecastCardProps = {
  quote: MarketQuote;
};

export function ForecastCard({ quote }: ForecastCardProps) {
  const change = ((quote.price - quote.startingPrice) / quote.startingPrice) * 100;
  const isGrowing = change >= 0;
  const targetPrice = quote.price * (isGrowing ? 1.025 : 0.975);

  return (
    <aside className="forecast-card">
      <p className="market-kicker">ПРОГНОЗ · СИМУЛЯЦИЯ</p>
      <h2>{quote.symbol} — ближайшая сессия</h2>
      <strong className={isGrowing ? '' : 'negative'}>
        {isGrowing ? 'Вероятен рост' : 'Возможна коррекция'} до ${targetPrice.toFixed(2)}
      </strong>
      <p>
        Сейчас акция изменилась на {formatChange(quote.price, quote.startingPrice)} от начальной цены.
        Прогноз обновляется вместе с рынком и не является финансовым советом.
      </p>
    </aside>
  );
}
