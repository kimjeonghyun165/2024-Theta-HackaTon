const BASE_URL = "http://18.118.99.36:5000";

const generateRealistic3DModel = async (imageUrl: string, resolution: boolean) => {
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
const generateLowPoly3DModel = async (imageUrl: string, strength: string) => {
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
const generateImage = async (prompt: string) => {
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

export { generateRealistic3DModel, generateLowPoly3DModel, generateImage }