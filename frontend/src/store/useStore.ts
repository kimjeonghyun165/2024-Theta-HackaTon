import { create } from 'zustand';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

const useStore = create<TypeState>((set) => ({
    selectedOption: "option1",
    setSelectedOption: (option) => set({ selectedOption: option }),
}));

export default useStore;
