type CoachFireProps = {
  canSellForProfit: boolean;
  isTrainingComplete: boolean;
  day: number;
  hasBoughtSpy: boolean;
  portfolioValue: number;
};

export function CoachFire({ canSellForProfit, day, hasBoughtSpy, isTrainingComplete, portfolioValue }: CoachFireProps) {
  const hasReachedGoal = portfolioValue >= 15000;
  const tip = hasReachedGoal
    ? 'Ты достиг цели! Теперь попробуй сохранить прибыль и не покупай всё сразу.'
    : isTrainingComplete
      ? 'Тренировка пройдена! Теперь ты можешь покупать и продавать любые акции сам.'
    : !hasBoughtSpy
      ? 'Твой первый шаг: нажми подсвеченную кнопку «Купить 1» у S&P 500 ниже.'
      : canSellForProfit
        ? 'Цена выросла! Нажми подсвеченную кнопку «Продать 1» у S&P 500 и зафиксируй прибыль.'
      : day === 1
        ? 'Акция куплена. Подожди, пока цена станет выше твоей цены покупки.'
        : 'Акция куплена. Следи за S&P 500 — тренер покажет продажу, когда будет прибыль.';

  return (
    <aside className="coach-fire">
      <div className="coach-avatar" aria-hidden="true">🔥</div>
      <div>
        <p>ТРЕНЕР ОГОНЁК</p>
        <strong>{tip}</strong>
        {!isTrainingComplete && !hasBoughtSpy && <span className="coach-arrow">↓ КУПИТЬ НИЖЕ</span>}
        {!isTrainingComplete && hasBoughtSpy && canSellForProfit && <span className="coach-arrow">↓ ПРОДАТЬ НИЖЕ</span>}
      </div>
    </aside>
  );
}
