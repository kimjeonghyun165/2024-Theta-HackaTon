import { create } from 'zustand';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

interface PromptState {
    prompt: string;
    setPrompt: (newPrompt: string) => void;
}

interface ImageState {
    image: number | null;
    setImage: (newImage: number) => void;
}

// interface isPostPopupVisibleState {
//     isPostPopupVisible: boolean
//     setPostPopupVisible: (isVisible: boolean) => void;
// }


export const useOptionStore = create<TypeState>((set) => ({
    selectedOption: "option1",
    setSelectedOption: (option) => set({ selectedOption: option }),
}));

export const usePromptStore = create<PromptState>((set) => ({
    prompt: '',
    setPrompt: (newPrompt) => set({ prompt: newPrompt }),
}));

export const useImgStore = create<ImageState>((set) => ({
    image: null,
    setImage: (newImage) => set({ image: newImage }),
}));

// export const usePostPopupStore = create<isPostPopupVisibleState>((set) => ({
//     isPostPopupVisible: false,
//     setPostPopupVisible: (isVisible) => set({ isPostPopupVisible: isVisible }),
// }));

