import { create } from 'zustand';
import Web3 from 'web3';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

interface Web3State {
    contract: any;
    setContract: (contract: any) => void;
    web3: Web3 | null;
    setWeb3: (web3: any) => void
}

interface FileState {
    fileUrl: string | '';
    setFileUrl: (fileUrl: string | undefined) => void;
    fetchFileUrl: (filename: string) => void;
}

export const useOptionStore = create<TypeState>((set) => ({
    selectedOption: "option1",
    setSelectedOption: (option) => set({ selectedOption: option }),
}));

export const useWeb3Store = create<Web3State>((set) => ({
    contract: null,
    setContract: (contract) => set({ contract: contract }),
    web3: null,
    setWeb3: (web3) => set({ web3: web3 })
}),
);

export const useFileStore = create<FileState>((set) => ({
    fileUrl: '',
    setFileUrl: (fileUrl) => set({ fileUrl }),
    fetchFileUrl: async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:3000/files/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const fileUrl = URL.createObjectURL(blob);
            set({ fileUrl });
        } catch (error) {
            console.error('Error fetching file:', error);
        }
    },
}));