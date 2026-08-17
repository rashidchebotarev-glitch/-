import { missions } from '../lib/missions';

type MissionPanelProps = { activeMission: number; experience: number; health: number };

export function MissionPanel({ activeMission, experience, health }: MissionPanelProps) {
  const mission = missions[activeMission];
  if (!mission) return <aside className="mission-panel"><strong>🏆 Все миссии пройдены!</strong></aside>;

  return (
    <aside className="mission-panel">
      <header><span>{mission.icon}</span><div><p>МИССИЯ {activeMission + 1} ИЗ {missions.length}</p><h2>{mission.title}</h2></div><b>❤️ {health} HP</b></header>
      <p className="mission-explanation">{mission.explanation}</p>
      <div className="mission-task"><span>ЧТО СДЕЛАТЬ</span><strong>{mission.task}</strong></div>
      <footer><span>{mission.reward} · {mission.badge}</span><small>Всего: {experience} XP</small></footer>
    </aside>
  );
}
