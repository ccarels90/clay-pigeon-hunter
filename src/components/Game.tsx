import { useState, useEffect } from 'react'
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from '../utils/localStorage'
import '../styles/Game.css'

const Game = () => {
  const [userData, setUserData] = useState({
    username: '',
    score: 0,
    highscores: [],
  })

  const [discs, setDiscs] = useState([])
  const [isGameRunning, setIsGameRunning] = useState(false)

  useEffect(() => {
    // Haal gebruikersgegevens op uit localStorage bij het mounten van de component
    const savedUserData = getDataFromLocalStorage('userData')
    if (savedUserData) {
      setUserData(savedUserData)
    }
  }, [])

  useEffect(() => {
    if (isGameRunning) {
      // Voeg een nieuwe disc toe aan de lijst van discs op willekeurige posities
      const disc = {
        id: Date.now(),
        left: Math.random() * (window.innerWidth - 50), // Breedte van de disc
        top: window.innerHeight, // Start vanaf de onderkant van het scherm
      }

      setDiscs((prevDiscs) => [...prevDiscs, disc])

      // Laat de disc na een paar seconden verdwijnen
      const timeoutId = setTimeout(() => {
        removeDisc(disc.id)
      }, 3000) // Disc verdwijnt na 3 seconden

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [isGameRunning])

  const handleHit = (id) => {
    // Verwijder de getroffen disc en verhoog de score
    removeDisc(id)
    const newScore = userData.score + 1

    // Update de gebruikersgegevens inclusief highscores en sla deze op in localStorage
    const updatedUserData = {
      ...userData,
      score: newScore,
      highscores: [...userData.highscores, newScore]
        .sort((a, b) => b - a)
        .slice(0, 10),
    }
    setUserData(updatedUserData)
    saveDataToLocalStorage('userData', updatedUserData)
  }

  const removeDisc = (id: number) => {
    // Verwijder de disc op basis van het id
    setDiscs((prevDiscs) => prevDiscs.filter((disc) => disc.id !== id))
  }

  const startGame = () => {
    setIsGameRunning(true)
  }

  const stopGame = () => {
    setIsGameRunning(false)
  }

  const renderDiscs = () => {
    return discs.map((disc) => (
      <div
        key={disc.id}
        className="disc"
        style={{
          left: disc.left,
          top: disc.top,
          width: '200px',
          height: '100px',
          backgroundColor: 'blue',
          borderRadius: '40%',
        }}
        onClick={() => handleHit(disc.id)}
      ></div>
    ))
  }

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
      <button onClick={stopGame}>Stop het spel</button>
      <div className="game-container">{renderDiscs()}</div>
    </div>
  )
}

export default Game
