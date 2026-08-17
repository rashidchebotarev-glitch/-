import type { MarketQuote } from './market';

export type MarketNews = {
  isPositive: boolean;
  text: string;
};

export function createMarketNews(quote: MarketQuote): MarketNews {
  const isPositive = Math.random() >= 0.5;
  const positiveNews = [
    `${quote.name} сообщает о сильных результатах. Инвесторы настроены оптимистично.`,
    `Хорошие новости для ${quote.symbol}: компания представила перспективные планы роста.`,
  ];
  const negativeNews = [
    `${quote.name} столкнулась с неопределённостью. Рынок реагирует осторожно.`,
    `Новость для ${quote.symbol}: инвесторы обсуждают возможные риски для компании.`,
  ];
  const news = isPositive ? positiveNews : negativeNews;

  return { isPositive, text: news[Math.floor(Math.random() * news.length)] };
}
