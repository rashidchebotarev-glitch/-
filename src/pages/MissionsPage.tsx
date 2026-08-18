import { Link } from 'wouter';
import { missions } from '../lib/missions';

export function MissionsPage() {
  return (
    <main className="market-page">
      <header className="market-header"><Link className="market-logo" href="/">NORTH<span>•</span>MARKET</Link><span className="market-status">⚡ МИССИИ</span></header>
      <section className="missions-page">
        <Link className="back-link" href="/">← К обзору рынка</Link>
        <p className="market-kicker">ОБУЧАЮЩАЯ ЛИНИЯ</p>
        <h1>Мои<br /><em>квесты.</em></h1>
        <div className="mission-list">
          {missions.map((mission, index) => <article key={mission.title}><span>{mission.icon}</span><div><small>МИССИЯ {index + 1}</small><h2>{mission.title}</h2><p>{mission.task}</p></div><b>{mission.reward}</b></article>)}
        </div>
      </section>
    </main>
  );
}
