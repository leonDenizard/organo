import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, checkUserExists } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [googleUser, setGoogleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      
      setGoogleUser(user)
      if (user && user.uid) {
        try {
          const backendData = await checkUserExists(user.uid);

          if (backendData) {
            setBackendUser(backendData);
          } else {
            setBackendUser(null);
          }
        } catch (error) {
          console.log("Erro ao buscar usuário no back authprovider", error);
        }
      } else {
        setGoogleUser(user);
      }

      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
