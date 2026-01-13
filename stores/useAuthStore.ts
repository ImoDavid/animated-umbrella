import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile_picture: string
  activePlan: any
  region: string;
  userType: string
  // add other user properties as needed
}

interface AuthState {
  profile: User | null;
  setProfile: (user: User) => void;
  clearProfile: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (user) => set({ profile: user }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({ profile: state.profile }), // persist only `profile`
    }
  )
);
