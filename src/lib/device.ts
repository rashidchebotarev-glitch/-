export type GameDevice = {
  icon: string;
  id: 'phone' | 'tablet' | 'computer';
  label: string;
};

export const gameDevices: GameDevice[] = [
  { id: 'phone', icon: '📱', label: 'Телефон' },
  { id: 'tablet', icon: '📲', label: 'Планшет' },
  { id: 'computer', icon: '💻', label: 'Компьютер' },
];
