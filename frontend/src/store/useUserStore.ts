import { create } from 'zustand';

interface User {
    _id?: string;
    address: string;
    signature: string;
    message: string;
    plan?: string;
    profileImg?: string;
    username?: string;
    models?: string[]
}

interface useUserState {
    user: User | null;
    jwtToken: string | null;
    setUser: (user: User | null) => void;
    setJwtToken: (token: string | null) => void;
    fetchUser: () => Promise<void>;
    addUser: (user: User) => Promise<void>;
    clearUser: () => void
}

export const useUserStore = create<useUserState>((set) => ({
    user: null,
    jwtToken: null,
    setUser: (user) => set({ user }),
    setJwtToken: (token) => set({ jwtToken: token }),

    fetchUser: async () => {
        const { jwtToken } = useUserStore.getState();
        const response = await fetch('http://localhost:3000/users/me', {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
            },
        });
        if (response.ok) {
            const user = await response.json();
            set({
                user,
            });
        } else {
            set({ user: null });
        }
    },

    addUser: async (user) => {
        const { jwtToken } = useUserStore.getState();
        const response = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(user),
        });
        if (response.ok) {
            const newUser = await response.json();
            set({ user: newUser });
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to save user');
        }
    },
    clearUser: () => set({ user: null }),
}));
