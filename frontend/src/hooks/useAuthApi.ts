import { useMutation } from "@tanstack/react-query";
import {
  login,
  register,
  sendVerificationCode,
  setPassword,
  veriftEmail,
} from "../api/authApi";
import {
  Login,
  RegisterUserDto,
  SendVerifyCodeDto,
  SetPasswordDto,
  VerifyEmailDto,
} from "../interfaces/auth.interface";
import { useAuthTokenStore, useVerifyTokenStore } from "../store/useUserStore";
import { getErrorMessage } from "../utils/utils";

export const useLogin = () => {
  const setAuthToken = useAuthTokenStore((state) => state.setAuthToken);
  return useMutation({
    mutationFn: (loginData: Login) => login(loginData),
    onSuccess: (data) => {
      const { accessToken } = data;
      setAuthToken(accessToken);
    },
    onError: (error: Error) => {
      getErrorMessage(error)
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (registerUserDto: RegisterUserDto) => register(registerUserDto),
    onSuccess: () => { },
  });
};

export const useSendVerificationCode = () => {
  return useMutation({
    mutationFn: (sendVerifyCodeDto: SendVerifyCodeDto) =>
      sendVerificationCode(sendVerifyCodeDto),
    onSuccess: () => { },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (verifyEmailDto: VerifyEmailDto) => veriftEmail(verifyEmailDto),
    onSuccess: () => { },
  });
};

export const useSetPassword = () => {
  const jwtToken = useVerifyTokenStore((state) => state.verifyToken);
  return useMutation({
    mutationFn: (setPasswordDto: SetPasswordDto) =>
      setPassword(setPasswordDto, jwtToken),
    onSuccess: () => { },
  });
};
