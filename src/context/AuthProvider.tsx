
import React, { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
    isAuthenticated: boolean
    login: (password: string, username?: string) => boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simple hardcoded credentials
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123" // In a real app never do this, but for local-only editing it's fine as per requirement

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated")
        if (auth === "true") {
            setIsAuthenticated(true)
        }
    }, [])

    const login = (password: string, username: string = "admin") => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsAuthenticated(true)
            localStorage.setItem("isAuthenticated", "true")
            return true
        }
        return false
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("isAuthenticated")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
