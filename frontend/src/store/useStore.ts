import { create } from 'zustand';
import Web3 from 'web3';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

interface ImageState {
    image: number | null;
    setImage: (newImage: number) => void;
}

interface Web3State {
    contract: any;
    setContract: (contract: any) => void;
    web3: Web3 | null;
    setWeb3: (web3: Web3 | null) => void;
    file: File | null;
    setFile: (file: File | null) => void;
}

export const useOptionStore = create<TypeState>((set) => ({
    selectedOption: "option1",
    setSelectedOption: (option) => set({ selectedOption: option }),
}));


export const useImgStore = create<ImageState>((set) => ({
    image: null,
    setImage: (newImage) => set({ image: newImage }),
}));

export const useWeb3Store = create<Web3State>((set) => ({
    contract: null,
    setContract: (contract) => set({ contract }),
    web3: null,
    setWeb3: (web3) => set({ web3 }),
    file: null,
    setFile: (file) => set({ file }),
}));