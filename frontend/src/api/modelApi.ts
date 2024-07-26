// 파일: src/api/modelApi.ts
import { Model } from "../store/useModelStore";

const BASE_URL = "http://18.218.73.197:5000";
const API_BASE_URL = 'http://localhost:3000/api';

export const generateRealistic3DModel = async (imageUrl: string, resolution: boolean) => {
    const response = await fetch(`${BASE_URL}/generate-3d-model`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_url: imageUrl,
            super_resolution: resolution,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
    }

    return response.json();
};

export const generateLowPoly3DModel = async (imageUrl: string, strength: string) => {
    const response = await fetch(`${BASE_URL}/generate-3d-lowpoly`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_url: imageUrl,
            low_poly_strength: strength,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
    }

    return response.json();
};

export const generateImage = async (prompt: string) => {
    const response = await fetch(`${BASE_URL}/generate-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`Error generating image: ${response.statusText}`);
    }

    return response.json();
};

export const fetchModel = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/models/getmodel/${id}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch model');
    }

    return await response.json();
};

export const fetchModels = async (offset: number = 0, limit: number = 30) => {
    const response = await fetch(`${API_BASE_URL}/models/getallmodels?offset=${offset}&limit=${limit}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to fetch models');
    }

    return await response.json();
};

export const addModel = async (model: Model, jwtToken: string | null) => {
    const response = await fetch(`${API_BASE_URL}/models/postmodel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(model),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add model');
    }

    return await response.json();
};
