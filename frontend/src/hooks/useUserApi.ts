import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUser, getUserModels, setRepresentativeModel, submitSurvey, toggleLikeModel, updateUser } from '../api/userApi';
import { FilterModelDto } from '../interfaces/model.interface';
import { SurveyDto, UpdateUserDto, User } from '../interfaces/user.interface';
import { ModalKey, useModalStore } from '../store/useStore';
import { useAuthTokenStore } from '../store/useUserStore';

export const useFetchUser = () => {
    const jwtToken = useAuthTokenStore((state) => state.authToken);
    console.log(jwtToken)
    return useQuery<User>({
        queryKey: ['userAccount'],
        queryFn: () => fetchUser(jwtToken),
        enabled: !!jwtToken,
        staleTime: 1000 * 60 * 5,
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: (updateUserDto: UpdateUserDto) => updateUser(updateUserDto, jwtToken),
        onSuccess: (updatedData) => {
            queryClient.setQueryData(['userAccount'], (oldData: any) => ({
                ...oldData,
                ...updatedData,
            }));
        },
    });
};
export const useGetUserModels = (filterModelDto: FilterModelDto) => {
    const jwtToken = useAuthTokenStore((state) => state.authToken);
    return useInfiniteQuery({
        queryKey: ['userModels', filterModelDto],
        queryFn: ({ pageParam = 0 }) => {
            const updatedFilter = { ...filterModelDto, offset: pageParam * (filterModelDto.limit ?? 10) };
            return getUserModels(updatedFilter, jwtToken);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return allPages.length;
        },
        initialPageParam: 0,
        enabled: !!jwtToken,
        staleTime: 1000 * 60 * 5,
    });
};

export const useSetRepresentativeModel = () => {
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: (modelId: string) => setRepresentativeModel(modelId, jwtToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userAccount'] });
        },
    });
};

export const useToggleLikeModel = () => {
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);

    return useMutation({
        mutationFn: (modelId: string) => toggleLikeModel(modelId, jwtToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userAccount'] });
        },
    });
};


export const useSurveyResponse = () => {
    const queryClient = useQueryClient();
    const jwtToken = useAuthTokenStore((state) => state.authToken);
    const closeModal = useModalStore((state) => state.closeModal)

    return useMutation({
        mutationFn: (surveyDto: SurveyDto) => {
            return submitSurvey(surveyDto, jwtToken);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userAccount'] });
            closeModal(ModalKey.SURVEY_MODAL);
        },
        onError: (error) => {
            console.error("Error submitting survey:", error);
        },
    });
};
