import { Link } from 'wouter';

export function DashboardSidebar() {
  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <aside className="dashboard-sidebar">
      <p>РАЗДЕЛЫ</p>
      <nav>
        <button onClick={() => scrollToSection('portfolio')}>💼 Мой портфель</button>
        <button onClick={() => scrollToSection('missions')}>⚡ Мои квесты</button>
        <button onClick={() => scrollToSection('quotes')}>⌁ Котировки</button>
        <Link href="/stocks/SPY">✦ AI помощник</Link>
      </nav>
      <small>AI поможет выбрать направление для акции.</small>
    </aside>
  );
}
