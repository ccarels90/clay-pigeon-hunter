import { useState, useEffect } from 'react'
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from '../utils/localStorage'
import '../styles/Game.css'
import HighScores from './HighScores'

class UserData {
  username: string
  score: number
  highscores: number[]

  constructor(username = '', score = 0, highscores = []) {
    this.username = username
    this.score = score
    this.highscores = highscores
  }

  addUsername(username: string): void {
    this.username = username
  }

  updateScore(newScore: number): void {
    this.score = newScore
  }

  addHighscore(score: number): void {
    this.highscores.push(score)
    this.highscores.sort((a, b) => b - a)
    this.highscores = this.highscores.slice(0, 10)
  }

  resetHighscores(): void {
    this.highscores = []
  }
}

const Game = () => {
  const [userData, setUserData] = useState<UserData>(new UserData())

  let lives = 8
  let gameSpeed = 0
  let numberOfhitsInRow = 0
  let numberOfMisses = 0

  const [discs, setDiscs] = useState([])
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [showHighscores, setShowHighscores] = useState(false)

  useEffect(() => {
    const savedUserData = getDataFromLocalStorage('userData')
    if (savedUserData) {
      setUserData(savedUserData)
    }

    return () => {}
  }, [])

  useEffect(() => {
    if (isGameRunning) {
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
    userData.updateScore(newScore)
    userData.addHighscore(newScore)
    setUserData(new UserData(userData.username, newScore, userData.highscores))
    saveDataToLocalStorage('userData', userData)
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

  const resetHighScore = () => {
    userData.resetHighscores()
    setUserData(new UserData(userData.username, userData.score, []))
    saveDataToLocalStorage('userData', userData)
  }

  const RenderDiscs = () => {
    return discs.map((disc) => (
      <div
        key={disc.id}
        className="disc"
        style={{
          left: disc.left,
          top: disc.top,
        }}
        onClick={() => handleHit(disc.id)}
      ></div>
    ))
  }

  const CurrentScore = () => {
    if (!isGameRunning) return null
    return (
      <div className="current-score">
        Current Score:
        <br /> <span>{userData.score} points</span>
      </div>
    )
  }

  const CreateUser = () => {
    const [inputValue, setInputValue] = useState('')
    const [started, setStarted] = useState(false)

    const handleChange = (event) => {
      setInputValue(event.target.value)
    }

    return (
      <div className="modal">
        <div className="modal__inner">
          {started ? (
            <div className="new-user">
              <input
                type="text"
                placeholder="Fill in your username.."
                name="username"
                onChange={handleChange}
              />
              <button
                onClick={() => {
                  userData.addUsername(inputValue)
                  saveDataToLocalStorage('userData', userData)

                  console.log('userData:', userData)
                }}
              >
                Create User
              </button>
            </div>
          ) : (
            <button onClick={() => setStarted(true)}>Start</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="game-canvas">
      {!userData.username && <CreateUser />}
      {userData.username && !isGameRunning && (
        <div className={`intro ${showHighscores ? 'hidden' : ''}`}>
          <h1>Hi {userData.username}!</h1>
          <p>Current score: {userData.score}</p>
          <div className="button__row">
            {isGameRunning ? (
              <button onClick={stopGame}>Stop Game</button>
            ) : (
              <button onClick={startGame}>Start Game</button>
            )}
            <button onClick={() => setShowHighscores(true)}>
              Show Highscores
            </button>
          </div>
        </div>
      )}

      <CurrentScore />

      {showHighscores && (
        <HighScores
          highscores={userData.highscores}
          setShowHighscores={setShowHighscores}
          reset={<button onClick={resetHighScore}>Reset highscore</button>}
        />
      )}

      {isGameRunning && RenderDiscs()}
    </div>
  )
}

export default Game
