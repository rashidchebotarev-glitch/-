type GameOverScreenProps = {
  onRestart: () => void;
  portfolioValue: number;
};

export function GameOverScreen({ onRestart, portfolioValue }: GameOverScreenProps) {
  return (
    <div className="game-over-screen" role="dialog" aria-modal="true">
      <p>СИМУЛЯЦИЯ ЗАВЕРШЕНА</p>
      <h1>Время вышло</h1>
      <strong>${portfolioValue.toFixed(2)}</strong>
      <span>Цель: $15 000 к началу 5-го дня</span>
      <button onClick={onRestart}>Попробовать снова →</button>
    </div>
  );
}
