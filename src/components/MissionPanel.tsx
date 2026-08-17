import type { Mission } from '../lib/missions';

type MissionPanelProps = { activeMission: number; experience: number; health: number; missionList: Mission[] };

export function MissionPanel({ activeMission, experience, health, missionList }: MissionPanelProps) {
  const mission = missionList[activeMission];
  if (!mission) return <aside className="mission-panel"><strong>🏆 Все миссии пройдены!</strong></aside>;

  return (
    <aside className="mission-panel">
      <header><span>{mission.icon}</span><div><p>МИССИЯ {activeMission + 1} ИЗ {missionList.length}</p><h2>{mission.title}</h2></div><b>❤️ {health} HP</b></header>
      <p className="mission-explanation">{mission.explanation}</p>
      <div className="mission-task"><span>ЧТО СДЕЛАТЬ</span><strong>{mission.task}</strong></div>
      <footer><span>{mission.reward} · {mission.badge}</span><small>Всего: {experience} XP</small></footer>
    </aside>
  );
}
