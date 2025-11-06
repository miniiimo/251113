import { STORAGE_KEYS } from '../constants';

// 최고 점수 저장
export const saveHighScore = (score: number): void => {
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORE, score.toString());
};

// 최고 점수 불러오기
export const loadHighScore = (): number => {
  const saved = localStorage.getItem(STORAGE_KEYS.HIGH_SCORE);
  return saved ? parseInt(saved, 10) : 0;
};

// 사운드 설정 저장
export const saveSoundEnabled = (enabled: boolean): void => {
  localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, enabled.toString());
};

// 사운드 설정 불러오기
export const loadSoundEnabled = (): boolean => {
  const saved = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
  return saved ? saved === 'true' : true;
};

