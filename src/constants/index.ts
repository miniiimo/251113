import { DifficultyConfig } from '../types';

// 난이도별 설정
export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  easy: {
    name: '쉬움',
    description: '2, 3, 5단 | 느린 속도',
    tables: [2, 3, 5],
    speed: 1,
    maxDroplets: 2,
    spawnInterval: 3000,
  },
  normal: {
    name: '보통',
    description: '2~5단 | 보통 속도',
    tables: [2, 3, 4, 5],
    speed: 1.5,
    maxDroplets: 3,
    spawnInterval: 2500,
  },
  hard: {
    name: '어려움',
    description: '2~9단 | 빠른 속도',
    tables: [2, 3, 4, 5, 6, 7, 8, 9],
    speed: 2,
    maxDroplets: 4,
    spawnInterval: 2000,
  },
};

// 게임 설정
export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  INITIAL_LIVES: 3,
  BASE_SCORE: 10,
  COMBO_BONUS: {
    5: 50,
    10: 100,
    20: 200,
  },
  FAST_ANSWER_BONUS: 5,
  FAST_ANSWER_THRESHOLD: 0.3, // 상단 30% 영역
};

// 점수에 따른 등급
export const GRADE_THRESHOLDS = [
  { min: 0, max: 100, stars: 1 },
  { min: 101, max: 300, stars: 2 },
  { min: 301, max: 500, stars: 3 },
  { min: 501, max: 700, stars: 4 },
  { min: 701, max: Infinity, stars: 5 },
];

// 답안 버튼에 표시할 숫자들 (0~81까지의 주요 구구단 답)
export const ANSWER_OPTIONS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  12, 14, 15, 16, 18, 20, 21, 24, 25,
  27, 28, 30, 32, 35, 36, 40, 42, 45,
  48, 49, 54, 56, 63, 64, 72, 81,
];

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  HIGH_SCORE: 'multiplicationRain_highScore',
  SOUND_ENABLED: 'multiplicationRain_soundEnabled',
};

