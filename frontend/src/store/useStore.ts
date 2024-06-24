import create from 'zustand';

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    incrementByAmount: (amount: number) => void;
}

const useStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    incrementByAmount: (amount: number) => set((state) => ({ count: state.count + amount })),
}));

export default useStore;
