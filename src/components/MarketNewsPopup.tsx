import type { MarketNews } from '../lib/news';
import newsPresenter from '../assets/news-presenter.png';

type MarketNewsPopupProps = {
  news: MarketNews | null;
  onClose: () => void;
};

export function MarketNewsPopup({ news, onClose }: MarketNewsPopupProps) {
  if (news === null) return null;

  return (
    <aside className={`market-news ${news.isPositive ? 'good-news' : 'bad-news'}`} aria-live="polite">
      <img className="news-presenter" src={newsPresenter} alt="Ведущий новостей с микрофоном" />
      <div className="news-message">
        <span>{news.isPositive ? '☀️ ХОРОШАЯ НОВОСТЬ' : '⚠️ ВАЖНАЯ НОВОСТЬ'}</span>
        <p>{news.text}</p>
        <button onClick={onClose}>Понятно</button>
      </div>
    </aside>
  );
}
