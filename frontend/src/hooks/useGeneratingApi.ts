import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateImage, generateLowPoly3DModel, generateRealistic3DModel } from "../api/modelApi";
import { useToast } from "../components/common/ToastContext";
import { useModelStore } from "../store/useModelStore";
import { useModelCreateLoadingStore, useOptionStore } from "../store/useStore";
import { useAuthTokenStore } from "../store/useUserStore";

export const useGenerateLowPoly3DModel = (strength: 'low' | 'mid' | 'high') => {
    const { setIsLoading } = useModelCreateLoadingStore();
    const { setNewModel } = useModelStore((state) => ({
        setNewModel: state.setNewModel,
    }));
    const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
    const { setToast } = useToast();
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: ({ imageUrl, strength }: { imageUrl: string; strength: 'low' | 'mid' | 'high' }) => {
            setIsLoading(true)
            return generateLowPoly3DModel(jwtToken, imageUrl, strength)
        },
        onSuccess: (data: { model_url: string; preview_url: string }) => {
            setNewModel({
                file: data.model_url,
                preview: data.preview_url,
                style: { method: 'lowpoly', strength },
            });
            queryClient.invalidateQueries({ queryKey: ['userAccount'] })
            setIsLoading(false)
            setSelectedOption('option4');
            setToast({
                message: 'Low poly 3D model generated successfully.',
                type: 'success',
                position: 'bottom-end',
            });
        },
        onError: () => {
            setIsLoading(false)
            setToast({
                message: 'Error generating low poly model. Please try again.',
                type: 'error',
                position: 'bottom-end',
            });
        },
    });
};

export const useGenerateRealistic3DModel = (resolution: boolean) => {
    const { setIsLoading } = useModelCreateLoadingStore();
    const { setNewModel } = useModelStore((state) => ({
        setNewModel: state.setNewModel,
    }));
    const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
    const { setToast } = useToast();
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: ({ imageUrl, resolution }: { imageUrl: string; resolution: boolean }) => {
            setIsLoading(true);
            return generateRealistic3DModel(jwtToken, imageUrl, resolution)
        },
        onSuccess: (data: { model_url: string; preview_url: string }) => {
            setNewModel({
                file: data.model_url,
                preview: data.preview_url,
                style: { method: 'realistic', superResolution: resolution },
            });
            queryClient.invalidateQueries({ queryKey: ['userAccount'] });
            setIsLoading(false)
            setSelectedOption('option4');
            setToast({
                message: 'Realistic 3D model generated successfully.',
                type: 'success',
                position: 'bottom-end',
            });
        },
        onError: () => {
            setIsLoading(false)
            setToast({
                message: 'Error generating realistic model. Please try again.',
                type: 'error',
                position: 'bottom-end',
            });
        },
    });
};

export const useGenerateImage = () => {
    const { setIsLoading } = useModelCreateLoadingStore();
    const { setNewModel } = useModelStore((state) => ({
        setNewModel: state.setNewModel,
    }));
    const setSelectedOption = useOptionStore((state) => state.setSelectedOption);
    const { setToast } = useToast();
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: ({ prompt }: { prompt: string }) => {
            setIsLoading(true);
            return generateImage(jwtToken, prompt);
        },
        onSuccess: (data) => {
            const images = data.image_urls.map((url: any) => ({
                url,
                selected: false,
            }));
            setNewModel({ imgSelection: images });
            queryClient.invalidateQueries({ queryKey: ['userAccount'] });
            setIsLoading(false)
            setSelectedOption('option2');
            setToast({
                message: 'Image generation completed successfully.',
                type: 'success',
                position: 'bottom-end',
            });
        },
        onError: () => {
            setIsLoading(false)
            setToast({
                message: 'Error generating image. Please try again.',
                type: 'error',
                position: 'bottom-end',
            });
        },
    });
};
