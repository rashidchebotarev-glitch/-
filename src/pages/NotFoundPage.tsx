import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <main className="market-page">
      <header className="market-header">
        <Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link>
        <span className="market-status">СТРАНИЦА НЕ НАЙДЕНА</span>
      </header>
      <section className="stock-page">
        <p className="market-kicker">ОШИБКА 404</p>
        <h1>Такой страницы<br /><em>пока нет.</em></h1>
        <p className="stock-name">Возможно, ссылка устарела. Вернёмся к рынку?</p>
        <Link className="registration-button" href="/">На главную</Link>
      </section>
    </main>
  );
}
