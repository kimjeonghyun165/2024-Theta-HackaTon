import { create } from "zustand";
import { CreateModelDto } from "../interfaces/model.interface";

interface useModelState {
  newModel: CreateModelDto;
  setNewModel: (model: Partial<CreateModelDto>) => void;
}

export const useModelStore = create<useModelState>((set) => ({
  newModel: {
    prompt: "",
    imgSelection: [],
    selectedImage: "",
    style: null,
    title: "",
    description: "",
    file: "",
    preview: "",
    visibility: "public",
    listing: false,
    price: null,
  },

  setNewModel: (model) =>
    set((state) => ({
      newModel: { ...state.newModel, ...model },
    })),
}));
