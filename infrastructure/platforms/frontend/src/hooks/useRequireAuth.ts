// hooks/useRequireAuth.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRequireAuth() {
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Vérifier si l’utilisateur est connecté via localStorage
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn !== "true") {
            // Redirige immédiatement vers la page de login
            router.push("/login");
        } else {
            setAuthChecked(true);
        }
    }, [router]);

    return authChecked;
}
