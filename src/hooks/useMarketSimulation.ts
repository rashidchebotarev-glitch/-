import { useEffect, useState } from 'react';
import { initialQuotes, moveMarket, movePrice } from '../lib/market';

export function useMarketSimulation() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [indexPrice, setIndexPrice] = useState(5469.3);

  useEffect(() => {
    const marketTimer = window.setInterval(() => {
      setQuotes((currentQuotes) => moveMarket(currentQuotes));
      setIndexPrice((currentPrice) => movePrice(currentPrice));
    }, 1000);

    return () => window.clearInterval(marketTimer);
  }, []);

  return { indexPrice, quotes, setQuotes };
}
