import { useEffect, useState } from 'react';
import type { PlayerCharacter } from '../lib/player';

type StoryIntroProps = {
  character: PlayerCharacter;
  onStart: () => void;
};

export function StoryIntro({ character, onStart }: StoryIntroProps) {
  const [scene, setScene] = useState(0);
  const scenes = [
    { eyebrow: 'ВЕЧЕР · ДЕНЬ 1', title: 'Ты возвращаешься домой.', text: 'В почтовом ящике тебя ждёт письмо.', icon: '🏠' },
    { eyebrow: 'СРОЧНОЕ УВЕДОМЛЕНИЕ', title: 'Счёт за дом: $15 000.', text: 'Его нужно оплатить за десять игровых дней.', icon: '📨' },
    { eyebrow: 'ТВОЙ ШАНС', title: 'Рынок уже открыт.', text: 'Покупай, наблюдай за ценой и принимай спокойные решения.', icon: '📈' },
  ];

  useEffect(() => {
    if (scene === scenes.length - 1) return;
    const timer = window.setTimeout(() => setScene((current) => current + 1), 2400);
    return () => window.clearTimeout(timer);
  }, [scene, scenes.length]);

  const currentScene = scenes[scene];

  return (
    <section className={`story-intro story-scene-${scene}`}>
      <div className="story-house" aria-hidden="true"><span>{currentScene.icon}</span><i /><i /><i /></div>
      <div className="story-content">
        <p className="market-kicker">{currentScene.eyebrow}</p>
        <p className="story-character">{character.avatar} {character.name}</p>
        <div className="story-copy" key={scene}>
          <h1>{currentScene.title}</h1>
          <p className="story-text">{currentScene.text}</p>
        </div>
        <div className="story-progress" aria-label={`Сцена ${scene + 1} из ${scenes.length}`}>
          {scenes.map((item, index) => <i className={index <= scene ? 'active' : ''} key={item.title} />)}
        </div>
        {scene === scenes.length - 1 && <button onClick={onStart}>Принять миссию <span>→</span></button>}
      </div>
    </section>
  );
}
