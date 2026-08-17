type PlayerLevelProps = {
  experience: number;
  isFirstQuestComplete: boolean;
};

const levelThresholds = [0, 50, 100, 150, 250, 350, 450, 600, 800];

export function PlayerLevel({ experience, isFirstQuestComplete }: PlayerLevelProps) {
  const levelIndex = levelThresholds.reduce((currentLevel, threshold, index) => (
    experience >= threshold ? index : currentLevel
  ), 0);
  const level = levelIndex + 1;
  const currentThreshold = levelThresholds[levelIndex];
  const nextThreshold = levelThresholds[levelIndex + 1];
  const progress = nextThreshold === undefined ? 100 : ((experience - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return (
    <aside className={`player-level ${isFirstQuestComplete ? 'level-up' : ''}`} aria-live="polite">
      <div className="level-number"><span>УРОВЕНЬ</span><strong key={level}>{level}</strong></div>
      <div className="level-progress">
        <p>Квест 1 · Купи SPY и продай с прибылью</p>
        <div className="level-bar"><i style={{ width: `${progress}%` }} /></div>
        <small>{nextThreshold === undefined ? 'Все уровни открыты!' : `${experience} / ${nextThreshold} XP до следующего уровня`}</small>
      </div>
      <b className={isFirstQuestComplete ? 'quest-complete' : ''}>
        {isFirstQuestComplete ? '✓ Квест пройден · +50 XP' : 'Награда: +50 XP'}
      </b>
    </aside>
  );
}
