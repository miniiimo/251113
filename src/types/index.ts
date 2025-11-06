// 게임 상태 타입
export type GameState = 'menu' | 'difficulty' | 'playing' | 'gameover';

// 난이도 레벨
export type Difficulty = 'easy' | 'normal' | 'hard' | 'custom';

// 물방울(문제) 타입
export interface Droplet {
  id: number;
  multiplicand: number; // 피승수
  multiplier: number; // 승수
  answer: number; // 정답
  x: number; // x 좌표
  y: number; // y 좌표
  speed: number; // 낙하 속도
}

// 난이도 설정 타입
export interface DifficultyConfig {
  name: string;
  description: string;
  tables: number[]; // 출제할 단수들
  speed: number; // 기본 낙하 속도
  maxDroplets: number; // 동시 물방울 개수
  spawnInterval: number; // 생성 간격 (ms)
}

// 게임 통계 타입
export interface GameStats {
  score: number;
  lives: number;
  correctAnswers: number;
  totalQuestions: number;
  combo: number;
  highScore: number;
}

// 게임 결과 타입
export interface GameResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  grade: number; // 별 개수 (1-5)
}

