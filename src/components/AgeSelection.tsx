import ageChoices from '../assets/age-choices.png';

type AgeSelectionProps = {
  onSelect: (group: 'junior' | 'senior') => void;
};

const ages = [{ label: '8–12 лет', group: 'junior' as const }, { label: '13–16 лет', group: 'senior' as const }];

export function AgeSelection({ onSelect }: AgeSelectionProps) {
  return (
    <section className="age-selection">
      <p className="market-kicker">НАСТРОЙКА ИГРЫ</p>
      <h1>Сколько тебе<br /><em>лет?</em></h1>
      <p>Выбери возрастную группу — так подсказки тренера будут понятнее.</p>
      <div className="age-cards">
        {ages.map((age, index) => (
          <button key={age.group} onClick={() => onSelect(age.group)}>
            <img alt="" src={ageChoices} style={{ objectPosition: `${index * 50}% center` }} />
            <strong>{age.label}</strong>
            <span>Выбрать →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
