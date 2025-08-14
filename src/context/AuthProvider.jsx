import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, checkUserExists } from "../services/firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {

  const [googleUser, setGoogleUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendUser, setBackendUser] = useState(null);

  const [isFirstUser, setIsFirstUser] = useState(false)

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);

      setGoogleUser(user);
      if (user && user.uid) {
        try {
          const response = await fetch(`${API_URL}/user`);
          const users = await response.json();

          if (users.length === 0) {
            console.log("Ninguem nessa bagaça");
            console.log("Estado do FirstUser dentro do Auth", isFirstUser);
            setIsFirstUser(true)

            const firstUser = {
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              admin: true,
              hasConfigured: false
            };

            const createUserResponse = await fetch(`${API_URL}/user`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(firstUser),
            });
            if (!createUserResponse.ok) {
              console.log(`Erro na requisição: ${response.status}`);
              const errorData = await response.json();
              console.log(errorData);

              return;
            }

            const data = await createUserResponse.json();
            console.log(data, isFirstUser);
          }

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
        isFirstUser,
        setIsFirstUser,
        isAdmin: backendUser?.admin ?? false,
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
