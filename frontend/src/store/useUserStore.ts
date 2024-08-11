import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addUser, fetchUser } from '../api/userApi';

export interface User {
    _id?: string;
    username?: string;
    email?: string;
    plan?: string;
    credits: number;
    profileImg?: string;
    models?: string[];
    likedModels: string[];
    status: 'active' | 'inactive' | 'banned';
}

interface useUserState {
    user: User | null;
    jwtToken: string | null;
    setUser: (user: User | null) => void;
    setJwtToken: (token: string | null) => void;
    fetchUser: () => Promise<void>;
    addUser: (user: User) => Promise<void>;
    clearUser: () => void;
}

export const useUserStore = create<useUserState>()(
    persist(
        (set, get) => ({
            user: null,
            jwtToken: null,
            setUser: (user) => set({ user }),
            setJwtToken: (token) => set({ jwtToken: token }),

            fetchUser: async () => {
                const { jwtToken } = get();
                try {
                    const user = await fetchUser(jwtToken);
                    console.log(jwtToken)
                    set({ user });
                } catch (error) {
                    set({ user: null });
                    console.error(error);
                }
            },

            addUser: async (user) => {
                const { jwtToken } = get();
                try {
                    const newUser = await addUser(user, jwtToken);
                    set({ user: newUser });
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            },

            clearUser: () => set({ user: null, jwtToken: null }),
        }),
        {
            name: 'user-storage',
        }
    )
);
