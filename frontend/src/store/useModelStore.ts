import { create } from 'zustand';
import { useUserStore } from './useUserStore';

interface Model {
    _id?: string;
    createdAt?: Date;
    file: string;
    title: string;
    description: string;
    prompt: string;
    preview: string;
    like?: number;
    visibility?: 'private' | 'public';
}

interface useModelState {
    model: Model | null;
    models: Model[];
    setModel: (model: Partial<Model>) => void;
    fetchModel: (id: string) => Promise<void>;
    fetchModels: () => Promise<void>;
    addModel: (model: Model) => Promise<void>;
}

export const useModelStore = create<useModelState>((set) => ({
    model: null,
    models: [],
    setModel: (model) => set((state) => ({
        model: { ...state.model, ...model } as Model
    })),

    fetchModel: async (id: string) => {
        const response = await fetch(`http://localhost:3000/models/getmodel/${id}`, {
            method: 'GET',
        });
        if (response.ok) {
            const model = await response.json();
            set({ model });
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to fetch model');
        }
    },

    fetchModels: async (offset: number = 0, limit: number = 30) => {
        const response = await fetch(`http://localhost:3000/models/getallmodels?offset=${offset}&limit=${limit}`, {
            method: 'GET',
        });
        if (response.ok) {
            const models = await response.json();
            set({ models });
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to fetch models');
        }
    },

    addModel: async (model) => {
        const { jwtToken } = useUserStore.getState();
        const response = await fetch('http://localhost:3000/models/postmodel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`,
            },
            body: JSON.stringify(model),
        });
        if (response.ok) {
            const newModel = await response.json();
            set((state) => ({
                models: [...state.models, newModel],
            }));
        } else {
            const errorText = await response.text();
            throw new Error(errorText || 'Failed to add model');
        }
    },
}));