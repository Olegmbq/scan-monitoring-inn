/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */

import { createContext, useCallback, useEffect, useState } from "react";

export type AuthMode = "real" | "demo";

type AuthContextType = {
  isAuth: boolean;
  token: string | null;
  mode: AuthMode;
  isDemo: boolean;

  user: {
    name: string;
    avatar: string;
  } | null;

  login: (token: string, expire: string, mode?: AuthMode) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [mode, setMode] = useState<AuthMode>("real");
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expire");
    localStorage.removeItem("authMode");

    setToken(null);
    setIsAuth(false);
    setMode("real");
    setUser(null);
  }, []);

  const login = useCallback(
    (newToken: string, expire: string, newMode: AuthMode = "real") => {
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("expire", expire);
      localStorage.setItem("authMode", newMode);

      setToken(newToken);
      setIsAuth(true);
      setMode(newMode);

      // mock user (как в фигме)
      setUser({
        name: "Алексей А.",
        avatar: "/avatar-placeholder.png",
      });
    },
    []
  );

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const expire = localStorage.getItem("expire");
    const savedMode = (localStorage.getItem("authMode") as AuthMode) || "real";

    if (savedToken && expire && new Date(expire) > new Date()) {
      setToken(savedToken);
      setIsAuth(true);
      setMode(savedMode);

      setUser({
        name: "Алексей А.",
        avatar: "/avatar-placeholder.png",
      });
    } else {
      setToken(null);
      setIsAuth(false);
      setMode("real");
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        mode,
        isDemo: mode === "demo",
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
