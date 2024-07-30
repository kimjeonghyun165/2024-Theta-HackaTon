import { Model } from "../store/useModelStore";
import { fetchFromApi } from "../utils/utils";

const API_BASE_URL = 'http://localhost:3000/api';

export const generateRealistic3DModel = async (jwtToken: string | null, imageUrl: string, resolution: boolean) => {
    return fetchFromApi(API_BASE_URL, 'generate/model-realistic', {
        imageUrl: imageUrl,
        superResolution: resolution,
    }, 'POST', jwtToken);
};

export const generateLowPoly3DModel = async (jwtToken: string | null, imageUrl: string, strength: string) => {
    return fetchFromApi(API_BASE_URL, 'generate/model-lowpoly', {
        imageUrl: imageUrl,
        lowPolyStrength: strength,
    }, 'POST', jwtToken);
};

export const generateImage = async (jwtToken: string | null, prompt: string) => {
    return fetchFromApi(API_BASE_URL, 'generate/image', {
        prompt: prompt,
    }, 'POST', jwtToken);
};

export const fetchModel = async (id: string) => {
    return fetchFromApi(API_BASE_URL, `models/${id}`, {}, 'GET');
};

export const fetchModels = async (offset: number = 0, limit: number = 30) => {
    return fetchFromApi(API_BASE_URL, `models/list?offset=${offset}&limit=${limit}`, {}, 'GET');
};

export const addModel = async (model: Model, jwtToken: string | null) => {
    return fetchFromApi(API_BASE_URL, 'models/create', model, 'POST', jwtToken);
};

