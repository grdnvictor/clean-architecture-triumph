'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {useRequireAuth} from "@/hooks/useRequireAuth";

export default function Logout() {
    // const authChecked = useRequireAuth();
    //
    // if (!authChecked) {
    //     return null;
    // }
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem("loggedIn");
        router.push("/login");
    }, [router]);

    return null;
}
