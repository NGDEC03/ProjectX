'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import axios, { AxiosError } from 'axios';
import { User } from '@/types/User';
import { redirect } from 'next/navigation';

interface Context {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    updateUser: () => void;
}

const userContext = createContext<Context | undefined>(undefined);

function UserContext({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                withCredentials: true,
            });
            setUser(response.data.user);
            if (response.status === 401) {
                setUser(null);
                redirect('/auth/signin');
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            console.error("Error fetching user:", axiosError.message);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const updateUser = () => {
        getUser();
    };

    return (
        <userContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext)
    if (!context) {
        throw new Error('Context should be used within the boundaries');
    }
    return context;
}

export { useUser, UserContext };
