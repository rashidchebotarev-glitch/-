export type MarketQuote = {
  name: string;
  price: number;
  startingPrice: number;
  symbol: string;
};

export const initialQuotes: MarketQuote[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 218.42, startingPrice: 218.42 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 142.18, startingPrice: 142.18 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.76, startingPrice: 248.76 },
];

export function findQuote(symbol: string): MarketQuote | undefined {
  return initialQuotes.find((quote) => quote.symbol === symbol.toUpperCase());
}

export function moveMarket(quotes: MarketQuote[]): MarketQuote[] {
  return quotes.map((quote) => {
    return { ...quote, price: movePrice(quote.price) };
  });
}

export function movePrice(price: number): number {
  const percentMove = (Math.random() - 0.5) * 0.8;
  return Math.max(price * (1 + percentMove / 100), 0.01);
}

export function formatChange(price: number, startingPrice: number): string {
  const change = ((price - startingPrice) / startingPrice) * 100;
  return `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
}
