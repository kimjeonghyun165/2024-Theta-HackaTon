import {
  useQuery,
  useMutation,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createModel,
  deleteModel,
  fetchModel,
  filterModels,
  updateModel,
} from "../api/modelApi";
import { CreateModelDto, FilterModelDto, Model, UpdateModelDto } from "../interfaces/model.interface";
import { useAuthTokenStore } from "../store/useUserStore";

export const useFetchModel = (id: string) => {
  return useQuery<Model>({
    queryKey: ["model", id],
    queryFn: () => fetchModel(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useFetchModels = (filterModelDto: FilterModelDto) => {
  return useInfiniteQuery({
    queryKey: ["models", filterModelDto],
    queryFn: ({ pageParam = 0 }) => {
      const updatedDto = { ...filterModelDto, offset: pageParam * (filterModelDto.limit ?? 10) };
      return filterModels(updatedDto);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 30000,
  });
};

export const useCreateModel = () => {
  const jwtToken = useAuthTokenStore((state) => state.authToken);

  return useMutation({
    mutationFn: (model: CreateModelDto) => createModel(model, jwtToken),
  });
};

export const useUpdateModel = () => {
  const jwtToken = useAuthTokenStore((state) => state.authToken);

  return useMutation({
    mutationFn: ({
      id,
      updateData,
    }: {
      id: string;
      updateData: UpdateModelDto;
    }) => updateModel(id, updateData, jwtToken),
  });
};

export const useDeleteModel = () => {
  const jwtToken = useAuthTokenStore((state) => state.authToken);

  return useMutation({
    mutationFn: (id: string) => deleteModel(id, jwtToken),
  });
};

export const useFilterModels = () => {
  return useMutation({
    mutationFn: (filterModelDto: FilterModelDto) => filterModels(filterModelDto),
  });
};
