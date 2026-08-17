import { gameDevices, type GameDevice } from '../lib/device';

type DeviceSelectionProps = {
  onSelect: (device: GameDevice) => void;
};

export function DeviceSelection({ onSelect }: DeviceSelectionProps) {
  return (
    <section className="device-selection">
      <p className="market-kicker">НАСТРОЙКА ИГРЫ · ШАГ 2</p>
      <h1>На чём будешь<br /><em>играть?</em></h1>
      <p>Мы подстроим расположение карточек под твой экран.</p>
      <div className="device-cards">
        {gameDevices.map((device) => (
          <button key={device.id} onClick={() => onSelect(device)}>
            <span aria-hidden="true" className={`device-preview ${device.id}`}><i /></span>
            <strong>{device.label}</strong><small>Выбрать →</small>
          </button>
        ))}
      </div>
    </section>
  );
}
