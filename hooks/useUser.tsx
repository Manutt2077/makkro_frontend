// hooks/useUser.ts
import { useEffect, useState } from "react";

export interface UserData {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export const useUser = () => {
  const [user, setUser] = useState<UserData | null>(null);

  // Leer desde localStorage
  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Escuchar cambios externos a localStorage 
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user") {
        loadUser();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return user;
};
