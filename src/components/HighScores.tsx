import { useEffect } from 'react'

type HighScoreProps = {
  highscores: number[]
  setShowHighscores: React.Dispatch<React.SetStateAction<boolean>>
  reset?: React.ReactNode
}

const HighScores = (props: HighScoreProps) => {
  const { highscores, setShowHighscores, reset } = props

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowHighscores(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="modal">
      <div className="modal__inner">
        <h2>Your Highscores</h2>
        {highscores?.length > 0 ? (
          <ol>
            {highscores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ol>
        ) : (
          <div>You don't have any highscores</div>
        )}
      </div>
      <div className="button__row">
        <button onClick={() => setShowHighscores(false)}>Close</button>
        {reset && reset}
      </div>
    </div>
  )
}

export default HighScores
