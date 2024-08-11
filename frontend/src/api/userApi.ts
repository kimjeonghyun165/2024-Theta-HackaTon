import { API_BASE_URL } from "../constant/url";
import { User } from "../store/useUserStore";
import { fetchFromApi } from "../utils/utils";

export const fetchUser = async (jwtToken: string | null) => {
    return fetchFromApi(
        API_BASE_URL,
        'user/account',
        {},
        'GET',
        jwtToken
    );
};

export const addUser = async (user: User, jwtToken: string | null) => {
    return fetchFromApi(
        API_BASE_URL,
        'user/create',
        user,
        'POST',
        jwtToken
    );
};



export const login = () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
};
