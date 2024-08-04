import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchModel,
  fetchModels,
  generateLowPoly3DModel,
  generateRealistic3DModel,
} from "../../api/modelApi";

export const useModel = (id: string) => {
  return useQuery({
    queryKey: ["model", id],
    queryFn: () => fetchModel(id),
  });
};

export const useModels = (offset: number = 0, limit: number = 30) => {
  return useQuery({
    queryKey: ["models", offset, limit],
    queryFn: () => fetchModels(offset, limit),
  });
};

export const useGenerateRealistic3DModel = () => {
  return useMutation({
    mutationFn: ({
      jwtToken,
      imageUrl,
      resolution,
    }: {
      jwtToken: string | null
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
