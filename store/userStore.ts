import { create } from 'zustand';

interface UserState {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string) => void;
  clearPhoneNumber: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  phoneNumber: null,
  setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
  clearPhoneNumber: () => set({ phoneNumber: null }),
})); 