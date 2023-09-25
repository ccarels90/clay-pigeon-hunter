import { useEffect, useState } from 'react'

import { useUserData } from './context/UserDataContext'

const HighScores = () => {
  const [visibility, setVisibility] = useState(false)
  const { userData } = useUserData()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setVisibility(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleResetHighscores = () => {
    userData.resetHighscores()
  }

  return visibility ? (
    <div className="modal">
      <div className="modal__inner">
        <h2>Your Highscores</h2>
        {userData.highscores?.length > 0 ? (
          <ol>
            {userData.highscores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ol>
        ) : (
          <div>You don't have any highscores</div>
        )}
      </div>
      <div className="button__row">
        <button onClick={() => setVisibility(false)}>Close</button>
        <button onClick={handleResetHighscores}>Reset highscore</button>
      </div>
    </div>
  ) : (
    <button className="highscore-button" onClick={() => setVisibility(true)}>
      MENU
    </button>
  )
}

export default HighScores
