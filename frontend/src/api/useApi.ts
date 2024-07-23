const BASE_URL = "http://3.134.90.120:5000";

export const generate3DModel = async (imageUrl: string, resolution: boolean) => {
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