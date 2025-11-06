import React from 'react';
import { GameResult } from '../types';

interface GameOverScreenProps {
  result: GameResult;
  onRestart: () => void;
  onMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  result,
  onRestart,
  onMenu,
}) => {
  const getGradeMessage = (grade: number): string => {
    switch (grade) {
      case 5: return '완벽해요! 🎉';
      case 4: return '대단해요! 👏';
      case 3: return '잘했어요! 😊';
      case 2: return '좋아요! 🙂';
      default: return '힘내요! 💪';
    }
  };

  return (
    <div className="screen gameover-screen">
      <div className="gameover-content">
        <h2 className="gameover-title">게임 끝!</h2>
        
        <div className="result-card">
          <div className="grade">
            {Array.from({ length: result.grade }).map((_, i) => (
              <span key={i} className="star">⭐</span>
            ))}
          </div>
          
          <p className="grade-message">{getGradeMessage(result.grade)}</p>

          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-label">최종 점수</span>
              <span className="stat-value large">{result.score}</span>
            </div>

            <div className="stat-row">
              <div className="stat-item">
                <span className="stat-label">맞춘 문제</span>
                <span className="stat-value">{result.correctAnswers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">전체 문제</span>
                <span className="stat-value">{result.totalQuestions}</span>
              </div>
            </div>

            <div className="stat-item">
              <span className="stat-label">정답률</span>
              <span className="stat-value">{result.accuracy}%</span>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn btn-primary" onClick={onRestart}>
            다시하기
          </button>
          <button className="btn btn-secondary" onClick={onMenu}>
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
};

