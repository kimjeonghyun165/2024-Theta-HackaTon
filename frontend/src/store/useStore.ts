import { create } from 'zustand';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
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