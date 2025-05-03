// hooks/useAdminAuth.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const [loading, setLoading] = useState(true);
const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}
