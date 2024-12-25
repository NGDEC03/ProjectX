'use client';
import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import Axios from 'axios';
import { User } from '@/types/user';

interface Context {
    user: User | null;
    updateUser: (email: string) => void;
}

const userContext = createContext<Context | null>(null);

function ContextWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const getUser = useCallback(async (email: string) => {
        try {
            if (email) { 
                const res = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`);
                setUser(res.data);

            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, []);


    const updateUser = (email: string) => {
        getUser(email);
    };

    return (
        <userContext.Provider value={{ user, updateUser }}>
            {children}
        </userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext)
    if (!context) {
        throw new Error('Used within the boundaries');
    }
    return context
}

export { useUser, ContextWrapper };
