import { createPortal } from 'react-dom';

type MissionPopupProps = {
  onClose: () => void;
  isVisible: boolean;
};

export function MissionPopup({ isVisible, onClose }: MissionPopupProps) {
  if (!isVisible) return null;

  return createPortal(
    <aside className="mission-popup" aria-live="polite">
      <span className="mission-icon">🎯</span>
      <span>МИССИЯ 1</span>
      <strong>Купи свою первую акцию</strong>
      <p>Выбери любую компанию в списке и нажми «Купить 1».</p>
      <button onClick={onClose}>Понятно</button>
    </aside>
  , document.body);
}
