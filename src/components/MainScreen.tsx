import React from 'react';

interface MainScreenProps {
  highScore: number;
  onStart: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({ highScore, onStart }) => {
  return (
    <div className="screen main-screen">
      <div className="main-content">
        <h1 className="game-title">
          <span className="title-icon">💧</span>
          구구단 산성비
          <span className="title-icon">⚡</span>
        </h1>
        <p className="game-subtitle">떨어지는 문제를 맞춰보세요!</p>
        
        <div className="high-score-display">
          <span className="high-score-label">최고 점수</span>
          <span className="high-score-value">{highScore}</span>
        </div>

        <button className="btn btn-primary btn-large" onClick={onStart}>
          시작하기
        </button>

        <div className="game-instructions">
          <h3>게임 방법</h3>
          <ul>
            <li>🎯 떨어지는 곱셈 문제의 정답을 클릭하세요</li>
            <li>❤️ 생명은 3개! 오답이나 놓치면 감소해요</li>
            <li>⭐ 연속으로 맞추면 보너스 점수!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

