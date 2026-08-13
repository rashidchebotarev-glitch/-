import { Link } from 'wouter';
import { Auth } from '../components/Auth';

export function AuthPage() {
  return (
    <main className="market-page">
      <header className="market-header">
        <Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link>
        <Link className="auth-back-link" href="/">← На главную</Link>
      </header>
      <section className="auth-page">
        <p className="market-kicker">ЛИЧНЫЙ ПРОФИЛЬ</p>
        <h1>Твой рынок<br /><em>начинается здесь.</em></h1>
        <p>Создай аккаунт, чтобы в будущем сохранять прогресс симуляции.</p>
        <Auth />
      </section>
    </main>
  );
}
