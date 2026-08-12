export function playEnterSound(): void {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.18);
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.28);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
  oscillator.addEventListener('ended', () => audioContext.close());
}

export function playBuySound(): void {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime + 0.08);
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.9, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.22);
  oscillator.addEventListener('ended', () => audioContext.close());
}

export function playSellSound(): void {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(520, audioContext.currentTime + 0.16);
  gain.gain.setValueAtTime(0.001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.9, audioContext.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.22);
  oscillator.addEventListener('ended', () => audioContext.close());
}
