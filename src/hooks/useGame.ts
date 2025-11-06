import { useState, useEffect, useCallback } from 'react';
import { GameState, GameStats, Difficulty, DifficultyConfig } from '../types';
import { DIFFICULTY_CONFIGS, GAME_CONFIG } from '../constants';
import { loadHighScore, saveHighScore } from '../utils/storage';
import { calculateGrade, getComboBonus, isFastAnswer } from '../utils/gameLogic';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [customTables, setCustomTables] = useState<number[]>([2, 3, 4, 5]);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    lives: GAME_CONFIG.INITIAL_LIVES,
    correctAnswers: 0,
    totalQuestions: 0,
    combo: 0,
    highScore: loadHighScore(),
  });

  // 최고 점수 업데이트
  useEffect(() => {
    if (stats.score > stats.highScore) {
      const newHighScore = stats.score;
      setStats(prev => ({ ...prev, highScore: newHighScore }));
      saveHighScore(newHighScore);
    }
  }, [stats.score, stats.highScore]);

  // 게임 시작
  const startGame = useCallback((selectedDifficulty: Difficulty, tables?: number[]) => {
    setDifficulty(selectedDifficulty);
    if (tables) {
      setCustomTables(tables);
    }
    setStats({
      score: 0,
      lives: GAME_CONFIG.INITIAL_LIVES,
      correctAnswers: 0,
      totalQuestions: 0,
      combo: 0,
      highScore: loadHighScore(),
    });
    setGameState('playing');
  }, []);

  // 정답 처리
  const handleCorrectAnswer = useCallback((dropletY: number, canvasHeight: number) => {
    setStats(prev => {
      const newCombo = prev.combo + 1;
      let bonusScore = 0;

      // 콤보 보너스
      const comboBonus = getComboBonus(newCombo);
      if (comboBonus > 0) {
        bonusScore += comboBonus;
      }

      // 빠른 답변 보너스
      if (isFastAnswer(dropletY, canvasHeight)) {
        bonusScore += GAME_CONFIG.FAST_ANSWER_BONUS;
      }

      return {
        ...prev,
        score: prev.score + GAME_CONFIG.BASE_SCORE + bonusScore,
        correctAnswers: prev.correctAnswers + 1,
        totalQuestions: prev.totalQuestions + 1,
        combo: newCombo,
      };
    });
  }, []);

  // 오답 처리
  const handleWrongAnswer = useCallback(() => {
    setStats(prev => {
      const newLives = prev.lives - 1;
      
      if (newLives <= 0) {
        setGameState('gameover');
      }

      return {
        ...prev,
        lives: newLives,
        totalQuestions: prev.totalQuestions + 1,
        combo: 0,
      };
    });
  }, []);

  // 생명력 감소 (물방울이 바닥에 닿았을 때)
  const loseLife = useCallback(() => {
    setStats(prev => {
      const newLives = prev.lives - 1;
      
      if (newLives <= 0) {
        setGameState('gameover');
      }

      return {
        ...prev,
        lives: newLives,
        combo: 0,
      };
    });
  }, []);

  // 게임 재시작
  const restartGame = useCallback(() => {
    setGameState('difficulty');
  }, []);

  // 메인으로
  const goToMenu = useCallback(() => {
    setGameState('menu');
  }, []);

  // 현재 난이도 설정 가져오기
  const getCurrentConfig = useCallback((): DifficultyConfig => {
    if (difficulty === 'custom') {
      return {
        ...DIFFICULTY_CONFIGS.normal,
        name: '커스텀',
        description: '직접 선택한 단수',
        tables: customTables,
      };
    }
    return DIFFICULTY_CONFIGS[difficulty];
  }, [difficulty, customTables]);

  // 게임 결과 계산
  const getGameResult = useCallback(() => {
    const accuracy = stats.totalQuestions > 0 
      ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100)
      : 0;
    
    return {
      score: stats.score,
      correctAnswers: stats.correctAnswers,
      totalQuestions: stats.totalQuestions,
      accuracy,
      grade: calculateGrade(stats.score),
    };
  }, [stats]);

  return {
    gameState,
    setGameState,
    difficulty,
    stats,
    startGame,
    handleCorrectAnswer,
    handleWrongAnswer,
    loseLife,
    restartGame,
    goToMenu,
    getCurrentConfig,
    getGameResult,
  };
};

