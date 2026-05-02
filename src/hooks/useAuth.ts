import { decodeJwt } from "@/lib/utils";
import type { JwtPayload } from "@/services/user/types";
import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = decodeJwt(storedToken);
        setDecodedToken(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
      }
    }

    setIsTokenLoading(false);
  }, []);

  const isTokenExpired = useCallback(() => {
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  }, [decodedToken]);

  const isTokenValid = useCallback(() => {
    return !!token && !isTokenExpired();
  }, [token, isTokenExpired]);

  const saveToken = useCallback((newToken: string) => {
    try {
      const decoded = decodeJwt(newToken);
      setDecodedToken(decoded);
      setToken(newToken);
      localStorage.setItem("token", newToken);
    } catch (error) {
      console.error(error);
      throw new Error("Invalid token");
    }
  }, []);

  const clearToken = useCallback(() => {
    setToken(null);
    setDecodedToken(null);
    localStorage.removeItem("token");
  }, []);

  return {
    token,
    decodedToken,
    isTokenValid: isTokenValid(),
    isTokenExpired: isTokenExpired(),
    saveToken,
    clearToken,
    isTokenLoading,
  };
};
