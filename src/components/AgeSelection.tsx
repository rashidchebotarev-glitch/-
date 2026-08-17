import ageChoices from '../assets/age-choices.png';

type AgeSelectionProps = {
  onSelect: () => void;
};

const ages = ['8–12 лет', '13–16 лет'];

export function AgeSelection({ onSelect }: AgeSelectionProps) {
  return (
    <section className="age-selection">
      <p className="market-kicker">НАСТРОЙКА ИГРЫ</p>
      <h1>Сколько тебе<br /><em>лет?</em></h1>
      <p>Выбери возрастную группу — так подсказки тренера будут понятнее.</p>
      <div className="age-cards">
        {ages.map((age, index) => (
          <button key={age} onClick={onSelect}>
            <img alt="" src={ageChoices} style={{ objectPosition: `${index * 50}% center` }} />
            <strong>{age}</strong>
            <span>Выбрать →</span>
          </button>
        ))}
      </div>
    </section>
  );
}
