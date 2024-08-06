import {
  useQuery,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  addModel,
  deleteModel,
  fetchModel,
  fetchModels,
  filterModel,
  generateImage,
  generateLowPoly3DModel,
  generateRealistic3DModel,
  likeModel,
  unlikeModel,
  updateModel,
} from "../../api/modelApi";
import { Model } from "../../store/useModelStore";

export const useFetchModel = (id: string) => {
  return useQuery({
    queryKey: ["model", id],
    queryFn: () => fetchModel(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchModels = (needCount: number) => {
  return useInfiniteQuery({
    queryKey: ["models"],
    queryFn: ({ pageParam = 0 }) => {
      const offset = needCount * pageParam;
      return fetchModels(offset, needCount);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1; // 다음 페이지를 가져오기 위한 인덱스 반환
    },
    staleTime: 30000,
  });
};

export const useGenerateRealistic3DModel = () => {
  return useMutation({
    mutationFn: ({
      jwtToken,
      imageUrl,
      resolution,
    }: {
      jwtToken: string | null;
      imageUrl: string;
      resolution: boolean;
    }) => generateRealistic3DModel(jwtToken, imageUrl, resolution),
  });
};

export const useGenerateLowPoly3DModel = () => {
  return useMutation({
    mutationFn: ({
      jwtToken,
      imageUrl,
      strength,
    }: {
      jwtToken: string | null;
      imageUrl: string;
      strength: string;
    }) => generateLowPoly3DModel(jwtToken, imageUrl, strength),
  });
};

export const useAddModel = () => {
  return useMutation({
    mutationFn: ({
      model,
      jwtToken,
    }: {
      model: Model;
      jwtToken: string | null;
    }) => addModel(model, jwtToken),
  });
};

export const useUpdateModel = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => updateModel(id),
  });
};

export const useDeleteModel = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteModel(id),
  });
};

export const useLikeModel = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => likeModel(id),
  });
};

export const useUnlikeModel = () => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => unlikeModel(id),
  });
};

export const useFilterModel = () => {
  return useMutation({
    mutationFn: ({
      createdBy,
      offset,
      limit,
    }: {
      createdBy: string;
      offset: number;
      limit: number;
    }) => filterModel(createdBy, offset, limit),
  });
};

export const useGenerateImage = () => {
  return useMutation({
    mutationFn: ({
      jwtToken,
      prompt,
    }: {
      jwtToken: string | null;
      prompt: string;
    }) => generateImage(jwtToken, prompt),
  });
};
