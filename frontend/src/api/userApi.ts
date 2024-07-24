import { User } from "../store/useUserStore";

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchUser = async (jwtToken: string | null) => {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }

    return await response.json();
};

export const addUser = async (user: User, jwtToken: string | null) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to save user');
    }

    return await response.json();
};


export const login = async (address: string, signature: string, message: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, signature, message }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to authenticate');
    }

    return await response.json();
};