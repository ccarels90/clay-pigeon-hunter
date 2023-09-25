import { useState, useEffect } from 'react'
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from '../utils/localStorage'
import '../styles/Game.css'
import HighScores from './HighScores'
import GameArea from './GameArea'
import CreateUser from '../utils/CreateUser'
import { UserDataProvider } from './context/UserDataContext'
import CurrentScore from './CurrentScore'

export class UserData {
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

    this.addHighscore(this.score)
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

  // reduceLive()
  // restartLives()
  let lives = 8

  // increaseGameSpeed()
  // decreaseGameSpeed()
  let gameSpeed = 0

  let numberOfhitsInRow = 0
  let numberOfMisses = 0

  const [isGameRunning, setIsGameRunning] = useState(false)

  useEffect(() => {
    const savedUserData = getDataFromLocalStorage('userData')
    if (savedUserData) {
      setUserData(savedUserData)
    }

    return () => {}
  }, [])

  const startGame = () => {
    setIsGameRunning(true)
  }

  const stopGame = () => {
    setIsGameRunning(false)
  }

  const removeCurrentUser = () => {
    removeDataFromLocalStorage('userData')
    window.location.reload()
  }

  return (
    <UserDataProvider>
      <div className="game-canvas">
        {userData.username && !isGameRunning && (
          <div className={`intro`}>
            <h1>Hi {userData.username}!</h1>

            <CurrentScore />

            <div className="button__row">
              <button onClick={startGame}>Start Game</button>
            </div>
          </div>
        )}

        {!userData.username && !isGameRunning && <CreateUser />}

        {isGameRunning && <CurrentScore />}
        <HighScores />

        {/* temporary button */}
        <button
          onClick={() => removeCurrentUser()}
          style={{ zIndex: 1, position: 'fixed', top: 0, left: 0 }}
        >
          Clear user
        </button>

        {isGameRunning && <GameArea />}
      </div>
    </UserDataProvider>
  )
}

export default Game
