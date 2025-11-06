import { useGame } from './hooks/useGame';
import { MainScreen } from './components/MainScreen';
import { DifficultyScreen } from './components/DifficultyScreen';
import { GameScreen } from './components/GameScreen';
import { GameOverScreen } from './components/GameOverScreen';
import { Difficulty } from './types';
import './App.css';

function App() {
  const {
    gameState,
    setGameState,
    stats,
    startGame,
    handleCorrectAnswer,
    handleWrongAnswer,
    loseLife,
    restartGame,
    goToMenu,
    getCurrentConfig,
    getGameResult,
  } = useGame();

  const renderScreen = () => {
    switch (gameState) {
      case 'menu':
        return (
          <MainScreen
            highScore={stats.highScore}
            onStart={() => setGameState('difficulty')}
          />
        );

      case 'difficulty':
        return (
          <DifficultyScreen
            onSelectDifficulty={(difficulty: Difficulty, customTables?: number[]) => {
              startGame(difficulty, customTables);
            }}
            onBack={goToMenu}
          />
        );

      case 'playing':
        return (
          <GameScreen
            stats={stats}
            config={getCurrentConfig()}
            onCorrectAnswer={handleCorrectAnswer}
            onWrongAnswer={handleWrongAnswer}
            onLoseLife={loseLife}
          />
        );

      case 'gameover':
        return (
          <GameOverScreen
            result={getGameResult()}
            onRestart={restartGame}
            onMenu={goToMenu}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
    </div>
  );
}

export default App;

