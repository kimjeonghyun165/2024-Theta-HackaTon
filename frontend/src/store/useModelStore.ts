import { create } from 'zustand';
import { useUserStore } from './useUserStore';
import { fetchModel, fetchModels, addModel } from '../api/modelApi';

interface NFTDetails {
    isNft: boolean;
    ipfsFile?: string;
    ipfsMetadata?: string;
    isListed?: boolean;
    price?: number;
}

export interface Model {
    _id?: string;
    createdAt?: Date;
    prompt: string;
    imgSelection: { url: string; selected: boolean }[];
    selectedImage: string;
    title: string;
    description: string;
    file: string;
    preview: string;
    like?: number;
    visibility?: 'private' | 'public';
    nftDetails: NFTDetails;
}

interface useModelState {
    model: Model | null;
    models: Model[];
    setModel: (model: Partial<Model>) => void;
    fetchModel: (id: string) => Promise<void>;
    fetchModels: (offset?: number, limit?: number) => Promise<void>;
    addModel: (model: Model) => Promise<void>;
}

export const useModelStore = create<useModelState>((set) => ({
    model: {
        prompt: '',
        imgSelection: [],
        selectedImage: '',
        title: '',
        description: '',
        file: '',
        preview: '',
        visibility: 'public',
        nftDetails: {
            isNft: false,
        },
    },
    models: [],
    setModel: (model) => set((state) => ({
        model: { ...state.model, ...model } as Model
    })),

    fetchModel: async (id: string) => {
        try {
            const model = await fetchModel(id);
            set({ model });
        } catch (error) {
            console.error(error);
        }
    },

    fetchModels: async (offset: number = 0, limit: number = 30) => {
        try {
            const models = await fetchModels(offset, limit);
            set({ models });
        } catch (error) {
            console.error(error);
        }
    },

    addModel: async (model) => {
        const { jwtToken } = useUserStore.getState();
        try {
            const newModel = await addModel(model, jwtToken);
            set((state) => ({
                models: [...state.models, newModel],
            }));
        } catch (error) {
            console.error(error);
        }
    },
}));
