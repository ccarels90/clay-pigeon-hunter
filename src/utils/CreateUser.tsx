import { useState } from 'react'
import { UserData } from '../components/Game'
import { saveDataToLocalStorage } from './localStorage'
import { useUserData } from '../components/context/UserDataContext'

const CreateUser = () => {
  const { userData, setUserData } = useUserData()
  const [inputValue, setInputValue] = useState('')
  const [started, setStarted] = useState(false)
  // const [userData, setUserData] = useState(new UserData())

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleCreateUser = (e) => {
    e.preventDefault() // Prevent the default form submission behavior
    const newUserData = new UserData(
      inputValue,
      userData.score,
      userData.highscores
    )
    setUserData(newUserData)
    saveDataToLocalStorage('userData', newUserData)
    setStarted(false)
  }

  return (
    <div className="modal">
      <div className="modal__inner">
        {started ? (
          <form onSubmit={handleCreateUser}>
            <div className="new-user">
              <input
                type="text"
                placeholder="Fill in your username.."
                name="username"
                value={inputValue}
                onChange={handleChange}
              />
              <button type="submit">Create User</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setStarted(true)}>Start</button>
        )}
      </div>
    </div>
  )
}

export default CreateUser
