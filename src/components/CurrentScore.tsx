import { useEffect } from 'react'
import { useUserData } from './context/UserDataContext'

const CurrentScore = () => {
  const { userData } = useUserData()

  useEffect(() => {
    console.log(userData.score)
  }, [userData])

  return (
    <div className="current-score">
      Current Score:
      <br /> <span>{userData.score} points</span>
    </div>
  )
}

export default CurrentScore
