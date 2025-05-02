// hooks/useAdminAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";

export function useAdminAuth() {
  const [loading, setLoading] = useState(true);
const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (!user) {
        window.location.href = "/login"; // ✅ Avoids flashing UI
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
