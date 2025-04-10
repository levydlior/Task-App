import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (newToken: string | null) => void;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
