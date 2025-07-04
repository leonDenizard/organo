import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, checkUserExists } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      setGoogleUser(user);
    });

    return () => {
      unsubscribe();
    };
    
  }, []);



  useEffect(() => {
    const fetchBackendUser = async () => {
      setIsLoading(true);
      if (googleUser && googleUser.uid) {

        try {
          const backendData = await checkUserExists(googleUser.uid);
          
          if (backendData) {
            setBackendUser(backendData);
          } else {
            setBackendUser(null);
          }
        } catch (error) {
          console.error("Erro buscando usuário no backend AUTHPROVIDER", error);
          setBackendUser(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Se não tem firebaseUser, limpa backendUser e loading
        setBackendUser(null);
        setIsLoading(false);
      }
    };
    fetchBackendUser();
  }, [googleUser]);

  const logOut = async () => {
    await auth.signOut();
    setGoogleUser(null);
    setBackendUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        googleUser,
        backendUser,
        isLoading,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export default AuthProvider;
