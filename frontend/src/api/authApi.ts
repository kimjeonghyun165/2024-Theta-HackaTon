import { API_BASE_URL } from "../constant/url";
import { Login, RegisterUserDto, SendVerifyCodeDto, SetPasswordDto, VerifyEmailDto } from "../interfaces/auth.interface";
import { fetchFromApi } from "../utils/utils";

export const googleLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/google/login`;
};

export const facebookLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/facebook/login`;
};

export const login = async (login: Login) => {
    return fetchFromApi(API_BASE_URL, "auth/login", login, "POST")
}

export const register = async (registerUserDto: RegisterUserDto) => {
    return fetchFromApi(API_BASE_URL, "auth/register", registerUserDto, "POST");
};

export const sendVerificationCode = async (sendVerifyCodeDto: SendVerifyCodeDto) => {
    return fetchFromApi(API_BASE_URL, "auth/send-verification-code", sendVerifyCodeDto, "POST")
}

export const veriftEmail = async (verifyEmailDto: VerifyEmailDto) => {
    return fetchFromApi(API_BASE_URL, "auth/verify-email", verifyEmailDto, "POST")
}

export const setPassword = async (setPasswordDto: SetPasswordDto, jwtToken: string) => {
    return fetchFromApi(API_BASE_URL, "auth/set-password", setPasswordDto, "POST", jwtToken)
}
