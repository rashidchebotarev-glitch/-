type DayTransitionProps = {
  day: number;
  isVisible: boolean;
};

export function DayTransition({ day, isVisible }: DayTransitionProps) {
  if (!isVisible) return null;

  return (
    <div className="day-transition" aria-live="assertive">
      <p>НОВАЯ ТОРГОВАЯ СЕССИЯ</p>
      <strong>День {day}</strong>
      <span>Рынок открывается</span>
    </div>
  );
}
