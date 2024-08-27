export interface RegisterUserDto {
    username: string;
    email: string;
    isEmailVerified?: boolean;
    profileImg?: string;
}

export interface VerifyEmailDto {
    email: string;
    code: string;
}

export interface SendVerifyCodeDto {
    email: string;
    action: 'register' | 'resend' | 'resetPassword'
}

export interface SetPasswordDto {
    password: string;
    confirmPassword: string;
}

export interface Login {
    email: string;
    password: string;
}

