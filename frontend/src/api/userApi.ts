import { User } from "../store/useUserStore";
import { fetchFromApi } from "../utils/utils";
const API_BASE_URL = 'https://anvil3d.ai/api';

export const fetchUser = async (jwtToken: string | null) => {
    return fetchFromApi(
        API_BASE_URL,
        'users/me',
        {},
        'GET',
        jwtToken
    );
};

export const addUser = async (user: User, jwtToken: string | null) => {
    return fetchFromApi(
        API_BASE_URL,
        'users/create',
        user,
        'POST',
        jwtToken
    );
};

export const login = async (address: string, signature: string, message: string) => {
    return fetchFromApi(
        API_BASE_URL,
        'auth/login',
        { address, signature, message },
        'POST'
    );
};
