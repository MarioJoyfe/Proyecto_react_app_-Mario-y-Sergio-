/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState } from "react"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // user: { email, role }

  const login = (email) => {
    if (email === "admin@admin.com") {
      setUser({ email, role: "admin" })
    } else {
      setUser({ email, role: "user" })
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
