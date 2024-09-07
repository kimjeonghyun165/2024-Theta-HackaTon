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
    models?: string[];
    likedModels?: string[];
    status?: 'pending' | 'active' | 'inactive' | 'banned';
}

export interface SurveyDto {
    country: string;
    occupation: string[];
    otherOccupation?: string;
    companyIndustry: string[];
    otherIndustry?: string;
    companySize: string;
    teamSize?: string;
    teamSharesAccount?: boolean;
    usageOfAnvilAI: string[];
    otherUsageOfAnvilAI?: string;
    [key: string]: any;
}

export interface LoginMethod {
    method: 'email' | 'google' | 'facebook' | 'apple';
    password?: string;
    isEmailVerified: boolean;
    verificationCodeDetails?: VerificationCodeDetails | null;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    loginMethod: LoginMethod;
    isSurveyCompleted: boolean;
    survey: SurveyDto;
    status: 'pending' | 'active' | 'inactive' | 'banned';
    profileImg: string;
    plan: string;
    credits: number;
    models: string[];
    likedModels: string[];
    purchasedModels: string[];
    totalLikesReceived: number;
    totalSales: number;
    createdAt: string;
    updatedAt: string;
}