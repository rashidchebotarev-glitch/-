type PlayerLevelProps = {
  experience: number;
  isFirstQuestComplete: boolean;
};

const experiencePerLevel = 50;

export function PlayerLevel({ experience, isFirstQuestComplete }: PlayerLevelProps) {
  const level = Math.floor(experience / experiencePerLevel) + 1;
  const progress = experience % experiencePerLevel;

  return (
    <aside className={`player-level ${isFirstQuestComplete ? 'level-up' : ''}`} aria-live="polite">
      <div className="level-number"><span>УРОВЕНЬ</span><strong key={level}>{level}</strong></div>
      <div className="level-progress">
        <p>Квест 1 · Купи SPY и продай с прибылью</p>
        <div className="level-bar"><i style={{ width: `${(progress / experiencePerLevel) * 100}%` }} /></div>
        <small>{progress} / {experiencePerLevel} XP до следующего уровня</small>
      </div>
      <b className={isFirstQuestComplete ? 'quest-complete' : ''}>
        {isFirstQuestComplete ? '✓ Квест пройден · +50 XP' : 'Награда: +50 XP'}
      </b>
    </aside>
  );
}
