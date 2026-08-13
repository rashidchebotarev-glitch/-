export type MarketQuote = {
  domain: string;
  exchange: string;
  name: string;
  price: number;
  startingPrice: number;
  symbol: string;
};

export const initialQuotes: MarketQuote[] = [
  { symbol: 'SPY', name: 'S&P 500 ETF', domain: 'ssga.com', exchange: 'NYSE Arca', price: 546.93, startingPrice: 546.93 },
  { symbol: 'AAPL', name: 'Apple Inc.', domain: 'apple.com', exchange: 'NASDAQ', price: 218.42, startingPrice: 218.42 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', domain: 'nvidia.com', exchange: 'NASDAQ', price: 142.18, startingPrice: 142.18 },
  { symbol: 'TSLA', name: 'Tesla Inc.', domain: 'tesla.com', exchange: 'NASDAQ', price: 248.76, startingPrice: 248.76 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', domain: 'microsoft.com', exchange: 'NASDAQ', price: 415.26, startingPrice: 415.26 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', domain: 'amazon.com', exchange: 'NASDAQ', price: 186.34, startingPrice: 186.34 },
  { symbol: 'GOOGL', name: 'Alphabet (Google)', domain: 'google.com', exchange: 'NASDAQ', price: 174.81, startingPrice: 174.81 },
  { symbol: 'META', name: 'Meta Platforms Inc.', domain: 'meta.com', exchange: 'NASDAQ', price: 503.12, startingPrice: 503.12 },
  { symbol: 'NFLX', name: 'Netflix Inc.', domain: 'netflix.com', exchange: 'NASDAQ', price: 689.45, startingPrice: 689.45 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', domain: 'amd.com', exchange: 'NASDAQ', price: 156.72, startingPrice: 156.72 },
  { symbol: 'DIS', name: 'The Walt Disney Company', domain: 'disney.com', exchange: 'NYSE', price: 111.38, startingPrice: 111.38 },
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
