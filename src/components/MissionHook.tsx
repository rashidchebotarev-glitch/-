type MissionHookProps = {
  day: number;
  isFirstQuestComplete: boolean;
  portfolioValue: number;
};

const targetValue = 15000;

export function MissionHook({ day, isFirstQuestComplete, portfolioValue }: MissionHookProps) {
  const progress = Math.min((portfolioValue / targetValue) * 100, 100);
  const nextAction = isFirstQuestComplete
    ? 'Новый шаг: изучи другие акции и не рискуй всем балансом.'
    : 'Первый шаг: купи SPY, дождись роста и продай с прибылью.';

  return (
    <aside className="mission-hook">
      <div className="mission-hook-title"><span>⚡</span><div><p>ГЛАВНАЯ МИССИЯ</p><strong>Оплати счёт за дом</strong></div></div>
      <div className="mission-hook-progress"><div><b>${portfolioValue.toFixed(0)}</b><span>из $15 000 · День {Math.min(day, 10)} из 10</span></div><div className="mission-hook-bar"><i style={{ width: `${progress}%` }} /></div></div>
      <small>{nextAction}</small>
    </aside>
  );
}
