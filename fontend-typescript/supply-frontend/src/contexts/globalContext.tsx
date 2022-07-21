import { createContext, ReactNode, useState } from "react"
import { User } from "../services/types/User"


interface AuthenticationContextProps {
  user: User | null | undefined
  setUser: (data: User) => void
  token: string | undefined | null
  setToken: (data: string | null) => void
}

export const AuthenticationContext = createContext<AuthenticationContextProps>({
  user: null,
  setUser: (data: User | null) => {},
  token: null,
  setToken: (data: string | null) => {},
})
interface AuthenticationContextProviderProps {
  children: ReactNode
}

export const AuthenticationContextProvider = (props: AuthenticationContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const contextValue: AuthenticationContextProps = {
    user: user,
    token: token,
    setUser,
    setToken,
  }
  return <AuthenticationContext.Provider value={contextValue}>{props.children}</AuthenticationContext.Provider>
}