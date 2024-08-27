import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    authToken: string;
    setAuthToken: (token: string) => void;
    clearAuthToken: () => void;
}

interface VerifyState {
    verifyToken: string;
    setVerifyToken: (token: string) => void;
    clearVerifyToken: () => void;
}

export const useAuthTokenStore = create<AuthState>()(
    persist(
        (set) => ({
            authToken: '',
            setAuthToken: (token) => set({ authToken: token }),
            clearAuthToken: () => set({ authToken: '' }),
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage,
            partialize: (state) => ({ authToken: state.authToken }),
        }
    )
);

export const useVerifyTokenStore = create<VerifyState>()(
    persist(
        (set) => ({
            verifyToken: '',
            setVerifyToken: (token) => set({ verifyToken: token }),
            clearVerifyToken: () => set({ verifyToken: '' }),
        }),
        {
            name: 'verify-storage',
            getStorage: () => sessionStorage,
            partialize: (state) => ({ verifyToken: state.verifyToken }),
        }
    )
);
