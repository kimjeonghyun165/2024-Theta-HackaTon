export interface StyleDto {
    method: 'lowpoly' | 'realistic';
    strength?: 'low' | 'mid' | 'high';
    superResolution?: boolean;
}

export interface ImgSelection {
    url: string;
    selected: boolean;
}

export interface Model {
    _id: string
    prompt: string;
    imgSelection: ImgSelection[];
    selectedImage: string;
    style: StyleDto | null
    title: string;
    description: string;
    file: string;
    preview: string;
    like?: number;
    visibility?: "private" | "public";
    listing: boolean;
    price: number | null
}

export interface CreateModelDto {
    prompt: string;
    imgSelection: ImgSelection[];
    selectedImage: string;
    style: StyleDto | null;
    title: string;
    description: string;
    file: string;
    preview: string;
    visibility?: 'private' | 'public';
    listing: boolean;
    price: number | null
}

export interface UpdateModelDto {
    title?: string;
    description?: string;
    like?: number;
    visibility?: 'private' | 'public';
    listing?: boolean,
    price?: number | null
}


export interface FilterModelDto {
    createdBy?: string;
    visibility?: 'private' | 'public';
    sortBy?: 'createdAt' | 'like';
    sortOrder?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}
