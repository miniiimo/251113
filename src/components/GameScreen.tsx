import React, { useEffect } from 'react';
import { GameStats, DifficultyConfig } from '../types';
import { useDroplets } from '../hooks/useDroplets';
import { GameCanvas } from './GameCanvas';
import { ANSWER_OPTIONS, GAME_CONFIG } from '../constants';

interface GameScreenProps {
  stats: GameStats;
  config: DifficultyConfig;
  onCorrectAnswer: (dropletY: number, canvasHeight: number) => void;
  onWrongAnswer: () => void;
  onLoseLife: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  stats,
  config,
  onCorrectAnswer,
  onWrongAnswer,
  onLoseLife,
}) => {
  const { droplets, checkAnswer, getCurrentProblem, reset } = useDroplets({
    isPlaying: true,
    config,
    onDropletReachBottom: onLoseLife,
  });

  const currentProblem = getCurrentProblem();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const handleAnswerClick = (answer: number) => {
    const result = checkAnswer(answer);
    
    if (result.correct && result.droplet) {
      onCorrectAnswer(result.droplet.y, GAME_CONFIG.CANVAS_HEIGHT);
    } else {
      onWrongAnswer();
    }
  };

  // 키보드 입력 지원
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      const num = parseInt(key);
      
      if (!isNaN(num) && ANSWER_OPTIONS.includes(num)) {
        handleAnswerClick(num);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [droplets]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="screen game-screen">
      {/* 상단 정보 바 */}
      <div className="game-header">
        <div className="lives">
          {Array.from({ length: stats.lives }).map((_, i) => (
            <span key={i} className="heart">❤️</span>
          ))}
          {Array.from({ length: GAME_CONFIG.INITIAL_LIVES - stats.lives }).map((_, i) => (
            <span key={i} className="heart empty">🖤</span>
          ))}
        </div>
        
        <div className="score-info">
          <div className="score">
            <span className="label">점수:</span>
            <span className="value">{stats.score}</span>
          </div>
          <div className="high-score">
            <span className="label">최고:</span>
            <span className="value">{stats.highScore}</span>
          </div>
        </div>

        {stats.combo >= 3 && (
          <div className="combo-display">
            🔥 {stats.combo} 콤보!
          </div>
        )}
      </div>

      {/* 게임 캔버스 */}
      <div className="canvas-container">
        <GameCanvas droplets={droplets} />
      </div>

      {/* 하단 입력 영역 */}
      <div className="game-controls">
        {currentProblem && (
          <div className="current-problem">
            현재 문제: <strong>{currentProblem.multiplicand} × {currentProblem.multiplier} = ?</strong>
          </div>
        )}

        <div className="answer-buttons">
          {ANSWER_OPTIONS.map(option => (
            <button
              key={option}
              className="answer-btn"
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

