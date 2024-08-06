import { API_BASE_URL } from "../constant/url";
import { User } from "../store/useUserStore";
import { fetchFromApi } from "../utils/utils";

//users, auth

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
