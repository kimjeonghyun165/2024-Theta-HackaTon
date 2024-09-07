import { create } from 'zustand';

interface TypeState {
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

export const useOptionStore = create<TypeState>((set) => ({
    selectedOption: "option1",
    setSelectedOption: (option) => set({ selectedOption: option }),
}));


export enum ModalKey {
    DETAIL_MODAL = 'detailModal',
    EDIT_PROFILE_MODAL = 'editProfileModal',
    SETTING_MODAL = 'settingModal',
    EDIT_MODAL = 'editModal',
    SUCCESS_MODAL = 'successModal',
    LOGIN_MODAL = 'loginModal',
    TERMS_MODAL = 'termsModal',
    SURVEY_MODAL = 'surveyModal'
}

interface ModalState {
    modals: { [key in ModalKey]: boolean };
    openModal: (modalName: ModalKey) => void;
    closeModal: (modalName: ModalKey) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    modals: {
        [ModalKey.DETAIL_MODAL]: false,
        [ModalKey.EDIT_PROFILE_MODAL]: false,
        [ModalKey.SETTING_MODAL]: false,
        [ModalKey.EDIT_MODAL]: false,
        [ModalKey.SUCCESS_MODAL]: false,
        [ModalKey.LOGIN_MODAL]: false,
        [ModalKey.TERMS_MODAL]: false,
        [ModalKey.SURVEY_MODAL]: false,
    },
    openModal: (modalName: ModalKey) =>
        set((state) => ({ modals: { ...state.modals, [modalName]: true } })),
    closeModal: (modalName: ModalKey) =>
        set((state) => ({ modals: { ...state.modals, [modalName]: false } })),
}));



interface SignUpState {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    initialStep: () => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    initialStep: () => set({ currentStep: 0 }),
}));


interface ResetPasswordState {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    initialStep: () => void;
}

export const useResetPasswordStore = create<ResetPasswordState>((set) => ({
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    initialStep: () => set({ currentStep: 0 }),
}));

interface SignUpEmailState {
    email: string;
    setEmail: (email: string) => void;
}

export const useSignUpEmailStore = create<SignUpEmailState>((set) => ({
    email: '',
    setEmail: (email) => set({ email }),
}));


interface ModelCreateLoadingState {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const useModelCreateLoadingStore = create<ModelCreateLoadingState>((set) => ({
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
}));