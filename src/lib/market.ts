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

export const memberQuotes: MarketQuote[] = [
  { symbol: 'BABA', name: 'Alibaba', domain: 'alibabagroup.com', exchange: 'NYSE / HKEX 9988', price: 86.42, startingPrice: 86.42 },
  { symbol: '0700', name: 'Tencent', domain: 'tencent.com', exchange: 'HKEX', price: 48.65, startingPrice: 48.65 },
  { symbol: '1211', name: 'BYD', domain: 'byd.com', exchange: 'HKEX', price: 29.18, startingPrice: 29.18 },
  { symbol: '1810', name: 'Xiaomi', domain: 'mi.com', exchange: 'HKEX', price: 5.71, startingPrice: 5.71 },
  { symbol: 'BIDU', name: 'Baidu', domain: 'baidu.com', exchange: 'NASDAQ / HKEX 9888', price: 91.66, startingPrice: 91.66 },
  { symbol: 'JD', name: 'JD.com', domain: 'jd.com', exchange: 'NASDAQ / HKEX 9618', price: 27.35, startingPrice: 27.35 },
  { symbol: '0857', name: 'PetroChina', domain: 'petrochina.com.cn', exchange: 'HKEX', price: 0.92, startingPrice: 0.92 },
  { symbol: '0941', name: 'China Mobile', domain: 'chinamobileltd.com', exchange: 'HKEX', price: 11.31, startingPrice: 11.31 },
  { symbol: '1398', name: 'ICBC', domain: 'icbc.com.cn', exchange: 'HKEX', price: 0.59, startingPrice: 0.59 },
  { symbol: 'CATL', name: 'CATL', domain: 'catl.com', exchange: 'SZSE 300750', price: 28.74, startingPrice: 28.74 },
  { symbol: '7203', name: 'Toyota', domain: 'toyota.com', exchange: 'TSE', price: 18.94, startingPrice: 18.94 },
  { symbol: '6758', name: 'Sony Group', domain: 'sony.com', exchange: 'TSE', price: 82.16, startingPrice: 82.16 },
  { symbol: '7974', name: 'Nintendo', domain: 'nintendo.com', exchange: 'TSE', price: 54.38, startingPrice: 54.38 },
  { symbol: '7267', name: 'Honda', domain: 'honda.com', exchange: 'TSE', price: 11.52, startingPrice: 11.52 },
  { symbol: '8306', name: 'Mitsubishi UFJ', domain: 'mufg.jp', exchange: 'TSE', price: 10.47, startingPrice: 10.47 },
  { symbol: '9984', name: 'SoftBank Group', domain: 'softbank.jp', exchange: 'TSE', price: 61.23, startingPrice: 61.23 },
  { symbol: '6501', name: 'Hitachi', domain: 'hitachi.com', exchange: 'TSE', price: 27.85, startingPrice: 27.85 },
  { symbol: '6752', name: 'Panasonic', domain: 'panasonic.com', exchange: 'TSE', price: 8.62, startingPrice: 8.62 },
  { symbol: '7201', name: 'Nissan', domain: 'nissan-global.com', exchange: 'TSE', price: 3.41, startingPrice: 3.41 },
  { symbol: '7751', name: 'Canon', domain: 'global.canon', exchange: 'TSE', price: 29.16, startingPrice: 29.16 },
];

export function findQuote(symbol: string): MarketQuote | undefined {
  return [...initialQuotes, ...memberQuotes].find((quote) => quote.symbol === symbol.toUpperCase());
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
