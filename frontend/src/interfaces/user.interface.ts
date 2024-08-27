export interface VerificationCodeDetails {
    code: string;
    expiresIn: number;
    hmac: string;
}

export interface UpdateUserDto {
    username?: string;
    password?: string;
    isEmailVerified?: boolean;
    verificationCodeDetails?: VerificationCodeDetails;
    plan?: string;
    credits?: number;
    profileImg?: string;
    representativeModel?: string;
    models?: string[];
    likedModels?: string[];
    status?: 'active' | 'inactive' | 'banned';
}


export interface User {
    _id: string;
    username: string;
    email: string;
    isEmailVerified: boolean;
    plan: string;
    credits: number;
    profileImg: string;
    representativeModel: string;
    models: string[];
    likedModels: string[];
    status: 'active' | 'inactive' | 'banned';
    verificationCodeDetails?: VerificationCodeDetails;
    createdAt: string;
    updatedAt: string;
}