import {create} from "zustand";

interface CountState {

  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCount = create<CountState>((set) => ({

  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useCount;