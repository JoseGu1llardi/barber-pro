import { createContext, ReactNode, useState } from 'react';

import Router from 'next/router';

import { destroyCookie } from 'nookies';

import { api } from '../services/apiClient';

interface AuthContextData {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credencials: SignInProps) => Promise<void>;
}

interface UserProps {
    id: string;
    name: string;
    email: string;
    address: string | null;
    subscriptions?: SubscriptionProps | null;
}

interface SubscriptionProps {
    id: string;
    status: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

interface SignInProps {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    console.log('Error logging out');

    try {
        destroyCookie(null, '@barber.token', { path: '/' });

        Router.push('/login');
        ;
    } catch (error) {
        console.log(error);
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            })
        } catch (err) {
            console.log("Error when logging!", err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}