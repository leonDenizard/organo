import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/firebase"

const AuthContext = createContext()

function AuthProvider( {children } ) {


    const [user, setUser] = useState(null)

    useEffect (() => {
        const unsubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])


  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    return useContext(AuthContext)
}
export default AuthProvider
