import { Droplet, DifficultyConfig } from '../types';
import { GRADE_THRESHOLDS, GAME_CONFIG } from '../constants';

// 랜덤 곱셈 문제 생성
export const generateProblem = (tables: number[]): { multiplicand: number; multiplier: number; answer: number } => {
  const table = tables[Math.floor(Math.random() * tables.length)];
  const multiplier = Math.floor(Math.random() * 9) + 1; // 1~9
  return {
    multiplicand: table,
    multiplier,
    answer: table * multiplier,
  };
};

// 새로운 물방울 생성
let dropletIdCounter = 0;
export const createDroplet = (config: DifficultyConfig, canvasWidth: number): Droplet => {
  const problem = generateProblem(config.tables);
  const padding = 80; // 좌우 여백
  
  return {
    id: dropletIdCounter++,
    ...problem,
    x: Math.random() * (canvasWidth - padding * 2) + padding,
    y: -50,
    speed: config.speed,
  };
};

// 점수에 따른 등급 계산
export const calculateGrade = (score: number): number => {
  const grade = GRADE_THRESHOLDS.find(g => score >= g.min && score <= g.max);
  return grade?.stars || 1;
};

// 콤보 보너스 계산
export const getComboBonus = (combo: number): number => {
  const bonuses = Object.entries(GAME_CONFIG.COMBO_BONUS).reverse();
  for (const [threshold, bonus] of bonuses) {
    if (combo >= parseInt(threshold)) {
      return bonus;
    }
  }
  return 0;
};

// 빠른 답변 여부 확인
export const isFastAnswer = (dropletY: number, canvasHeight: number): boolean => {
  return dropletY < canvasHeight * GAME_CONFIG.FAST_ANSWER_THRESHOLD;
};

