import { API_BASE_URL } from "../constant/url";
import { CreateModelDto, FilterModelDto, UpdateModelDto } from "../interfaces/model.interface";
import { fetchFromApi } from "../utils/utils";

export const createModel = async (model: CreateModelDto, jwtToken: string) => {
  return fetchFromApi(API_BASE_URL, "model/create", model, "POST", jwtToken);
};

export const updateModel = async (id: string, updateData: UpdateModelDto, jwtToken: string) => {
  return fetchFromApi(API_BASE_URL, `model/update/${id}`, updateData, "PUT", jwtToken);
};

export const deleteModel = async (id: string, jwtToken: string) => {
  return fetchFromApi(API_BASE_URL, `model/delete/${id}`, {}, "DELETE", jwtToken);
};

export const fetchModel = async (id: string) => {
  return fetchFromApi(API_BASE_URL, `model/${id}`, {}, "GET");
};

export const filterModels = async (filterModelDto: FilterModelDto) => {
  const queryParams = new URLSearchParams(filterModelDto as any).toString();

  return fetchFromApi(
    API_BASE_URL,
    `model/filter?${queryParams}`,
    {},
    "GET"
  );
};

export const generateImage = async (
  jwtToken: string,
  prompt: string
) => {
  return fetchFromApi(
    API_BASE_URL,
    "generate/image",
    {
      prompt: prompt,
    },
    "POST",
    jwtToken
  );
};

export const generateLowPoly3DModel = async (
  jwtToken: string,
  imageUrl: string,
  strength: string
) => {
  return fetchFromApi(
    API_BASE_URL,
    "generate/model-lowpoly",
    {
      imageUrl: imageUrl,
      lowPolyStrength: strength,
    },
    "POST",
    jwtToken
  );
};

export const generateRealistic3DModel = async (
  jwtToken: string,
  imageUrl: string,
  resolution: boolean
) => {
  return fetchFromApi(
    API_BASE_URL,
    "generate/model-realistic",
    {
      imageUrl: imageUrl,
      superResolution: resolution,
    },
    "POST",
    jwtToken
  );
};
