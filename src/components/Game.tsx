import { useState, useEffect } from 'react';
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from '../utils/localStorage';
import '../styles/Game.css';

const Game = () => {
  const [userData, setUserData] = useState({
    username: '',
    score: 0,
    highscores: [],
  });

  const [isGameRunning, setIsGameRunning] = useState(false);

  useEffect(() => {
    // Haal gebruikersgegevens op uit localStorage bij het mounten van de component
    const savedUserData = getDataFromLocalStorage('userData');
    if (savedUserData) {
      setUserData(savedUserData);
    }
  }, []);

  const startGame = () => {
    setIsGameRunning(true);
  };

  const stopGame = () => {
    setIsGameRunning(false);
  };

  return (
    <div className="game-canvas">
      <h1>Welkom, {userData.username}</h1>
      <p>Score: {userData.score}</p>
      {userData.highscores.length > 0 && (
        <div>
          <h2>Top 10 Highscores:</h2>
          <ul>
            {userData.highscores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={startGame}>Start het spel</button>
    </div>
  );
};

export default Game;
