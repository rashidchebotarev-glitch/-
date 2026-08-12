import type { MarketQuote } from './market';

export type Portfolio = {
  balance: number;
  holdings: Record<string, number>;
};

export type TradeAction = 'buy' | 'sell';

export const initialPortfolio: Portfolio = {
  balance: 10000,
  holdings: {},
};

export function tradeStock(
  portfolio: Portfolio,
  quote: MarketQuote,
  action: TradeAction,
): { message: string; portfolio: Portfolio } {
  const ownedShares = portfolio.holdings[quote.symbol] ?? 0;

  if (action === 'buy') {
    if (portfolio.balance < quote.price) {
      return { message: 'Недостаточно денег для покупки.', portfolio };
    }

    return {
      message: `Куплена 1 акция ${quote.symbol}.`,
      portfolio: {
        balance: portfolio.balance - quote.price,
        holdings: { ...portfolio.holdings, [quote.symbol]: ownedShares + 1 },
      },
    };
  }

  if (ownedShares === 0) {
    return { message: `У тебя нет акций ${quote.symbol} для продажи.`, portfolio };
  }

  return {
    message: `Продана 1 акция ${quote.symbol}.`,
    portfolio: {
      balance: portfolio.balance + quote.price,
      holdings: { ...portfolio.holdings, [quote.symbol]: ownedShares - 1 },
    },
  };
}
