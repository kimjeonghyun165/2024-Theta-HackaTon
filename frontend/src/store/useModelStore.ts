import { create } from "zustand";
import { CreateModelDto, Model } from "../interfaces/model.interface";

interface useModelState {
  editModel: Model | null,
  setEditModel: (model: Model) => void,
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
  editModel: null,
  setEditModel: (model: Model) =>
    set((state) => ({
      editModel: { ...state.editModel, ...model },
    })),
}));
