import { create } from "zustand";

export const useStore = create((set) => ({
    user: [],
    deleteUser: () => set((state) => ({ user: [] })),
    setUser: (user) => set((state) => ({ user: user })),
}));
