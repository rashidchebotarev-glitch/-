import { Link } from 'wouter';

export function DashboardSidebar() {
  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <aside className="dashboard-sidebar">
      <p>РАЗДЕЛЫ</p>
      <nav>
        <Link href="/portfolio">💼 Мой портфель</Link>
        <Link href="/missions">⚡ Мои квесты</Link>
        <button onClick={() => scrollToSection('quotes')}>⌁ Котировки</button>
        <Link href="/assistant">✦ AI помощник</Link>
      </nav>
      <small>AI поможет выбрать направление для акции.</small>
    </aside>
  );
}
