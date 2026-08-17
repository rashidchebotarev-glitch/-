import { playerCharacters, type PlayerCharacter } from '../lib/player';

type CharacterSelectionProps = {
  onSelect: (character: PlayerCharacter) => void;
};

export function CharacterSelection({ onSelect }: CharacterSelectionProps) {
  return (
    <section className="character-selection">
      <p className="market-kicker">НАСТРОЙКА ИГРЫ · ШАГ 2</p>
      <h1>Выбери<br /><em>персонажа</em></h1>
      <p>Он станет твоим героем в торговой игре.</p>
      <div className="character-cards">
        {playerCharacters.map((character) => (
          <button key={character.name} onClick={() => onSelect(character)}>
            <span className="character-avatar">{character.avatar}</span>
            <strong>{character.name}</strong>
            <small>{character.role}</small>
            <b>Выбрать →</b>
          </button>
        ))}
      </div>
    </section>
  );
}
