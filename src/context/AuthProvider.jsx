import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, checkUserExists } from "../services/firebase"

const AuthContext = createContext()

function AuthProvider( { children } ) {



    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isUserRegistered, setIsUserRegistered] = useState(null)

    //console.log("USEAuth", user)
    //console.log("loading", isLoading)

    useEffect (() => {
        const unsubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    useEffect(()=>{

      const verifyUser = async () => {
        if (user && user.uid) {
          const exists = await checkUserExists(user.uid)
          setIsUserRegistered(exists);
          setIsLoading(false)
        }
      };
      verifyUser();
    }, [user])


    const logOut = async () => {
      await auth.signOut()
      setUser(null)
    }
  return (
    <AuthContext.Provider value={{user, setUser, isLoading, isUserRegistered, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    return useContext(AuthContext)
}
export default AuthProvider
