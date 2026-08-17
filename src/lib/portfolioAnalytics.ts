import type { MarketQuote } from './market';
import type { Portfolio } from './portfolio';

export type PositionAnalytics = {
  allocationPercent: number;
  averagePrice: number;
  currentValue: number;
  profitPercent: number;
  profitValue: number;
};

export function getPositionAnalytics(
  portfolio: Portfolio,
  quote: MarketQuote,
  portfolioValue: number,
): PositionAnalytics {
  const shares = portfolio.holdings[quote.symbol] ?? 0;
  const averagePrice = portfolio.averagePrices[quote.symbol] ?? quote.price;
  const currentValue = quote.price * shares;
  const investedValue = averagePrice * shares;
  const profitValue = currentValue - investedValue;

  return {
    allocationPercent: portfolioValue > 0 ? (currentValue / portfolioValue) * 100 : 0,
    averagePrice,
    currentValue,
    profitPercent: investedValue > 0 ? (profitValue / investedValue) * 100 : 0,
    profitValue,
  };
}
