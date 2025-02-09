'use client';
import { createContext, useContext, useState } from "react";
interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (firstname: string, lastname: string, email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoading: boolean;
}

// API endpoints configuration
const API_ROUTES = {
    SIGN_IN: 'http://localhost:8000/auth/signin',
    SIGN_UP: '/auth/signup',
    SIGN_OUT: '/auth/signout'
} as const;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleApiRequest = async (url: string, method: string, body?: object) => {
        setIsLoading(true);
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || `Failed to ${method.toLowerCase()} user`);
            }

            const data = await response.json();
            if (method !== 'POST' || url !== API_ROUTES.SIGN_OUT) {
                setUser(data);
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const authContextValue: AuthContextType = {
        user,
        isLoading,
        signIn: (email, password) =>
            handleApiRequest(API_ROUTES.SIGN_IN, 'POST', { email, password }),
        signUp: (firstname, lastname, email, password) =>
            handleApiRequest(API_ROUTES.SIGN_UP, 'POST', { firstname, lastname, email, password }),
        signOut: async () => {
            await handleApiRequest(API_ROUTES.SIGN_OUT, 'POST');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}