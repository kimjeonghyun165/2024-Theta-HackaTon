import { API_BASE_URL } from "../constant/url";
import { FilterModelDto } from "../interfaces/model.interface";
import { SurveyDto, UpdateUserDto, User } from "../interfaces/user.interface";
import { fetchFromApi } from "../utils/utils";

export const fetchUser = async (jwtToken: string): Promise<User> => {
    return fetchFromApi(
        API_BASE_URL,
        'user/account',
        {},
        'GET',
        jwtToken
    );
};

export const updateUser = async (updateUserDto: UpdateUserDto, jwtToken: string) => {
    return fetchFromApi(API_BASE_URL, "user/update", updateUserDto, "PUT", jwtToken);
};

export const getUserModels = async (filterModelDto: FilterModelDto, jwtToken: string) => {
    const queryParams = new URLSearchParams(filterModelDto as any).toString();
    return fetchFromApi(API_BASE_URL, `user/my-models?${queryParams}`, {}, "GET", jwtToken);
};

export const setRepresentativeModel = async (modelId: string, jwtToken: string) => {
    return fetchFromApi(API_BASE_URL, "user/set-representative-model", { modelId }, "PUT", jwtToken);
};

export const toggleLikeModel = async (modelId: string, jwtToken: string) => {
    return fetchFromApi(API_BASE_URL, `user/like/${modelId}`, {}, "PATCH", jwtToken);
};

export const submitSurvey = async (surveyDto: SurveyDto, jwtToken: string) => {
    return fetchFromApi(API_BASE_URL, "user/survey/complete", surveyDto, "PATCH", jwtToken)
}

