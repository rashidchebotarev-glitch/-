import { useState } from 'react';
import { getAiForecast, type AiForecast } from '../lib/aiForecast';
import { formatChange, type MarketQuote } from '../lib/market';

type ForecastCardProps = {
  quote: MarketQuote;
};

export function ForecastCard({ quote }: ForecastCardProps) {
  const [forecast, setForecast] = useState<AiForecast | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function askAi() {
    setError('');
    setIsLoading(true);

    try {
      setForecast(await getAiForecast(quote));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не получилось спросить AI.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside className="forecast-card">
      <p className="market-kicker">AI-РЕШЕНИЕ · СИМУЛЯЦИЯ</p>
      <h2>{quote.symbol} — ближайшая сессия</h2>
      {forecast ? (
        <>
          <strong className={forecast.direction === 'down' ? 'negative' : ''}>
            AI выбирает: {forecast.direction === 'up' ? 'ВВЕРХ ↑' : 'ВНИЗ ↓'}
          </strong>
          <p>{forecast.explanation}</p>
        </>
      ) : <p>AI посмотрит на текущую динамику {formatChange(quote.price, quote.startingPrice)} и выберет направление.</p>}
      <button className="ai-forecast-button" disabled={isLoading} onClick={askAi}>
        {isLoading ? 'AI думает…' : forecast ? 'Спросить AI ещё раз' : 'Спросить AI'}
      </button>
      {error && <p className="ai-forecast-error">{error}</p>}
      <p className="forecast-disclaimer">Это учебная симуляция, не финансовый совет.</p>
    </aside>
  );
}
