type SimulationPanelProps = {
  day: number;
  portfolioValue: number;
};

const events = [
  'Тех-сектор в фокусе: котировки двигаются активнее.',
  'Спокойная сессия: рынок ищет направление.',
  'Инвесторы обсуждают новые продукты компаний.',
  'Волатильность выросла: следи за ценами.',
];

export function SimulationPanel({ day, portfolioValue }: SimulationPanelProps) {
  return (
    <section className="simulation-panel" key={day}>
      <p className="new-day-message">Новый день · рынок открывается</p>
      <div><span>ИГРОВОЕ ВРЕМЯ</span><strong>День {day}</strong></div>
      <div><span>СТОИМОСТЬ ПОРТФЕЛЯ</span><strong>${portfolioValue.toFixed(2)}</strong></div>
      <div className="simulation-goal"><span>ЦЕЛЬ СИМУЛЯЦИИ</span><strong>$15 000</strong></div>
      <p><b>Событие рынка:</b> {events[(day - 1) % events.length]}</p>
    </section>
  );
}
