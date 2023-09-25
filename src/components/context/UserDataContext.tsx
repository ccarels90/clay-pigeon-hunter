import React, { createContext, useContext, useState } from 'react'
import { UserData } from '../Game'

type UserDataContextType = {
  userData: UserData
  setUserData: React.Dispatch<React.SetStateAction<UserData>>
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
)

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(new UserData())

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  )
}

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}
