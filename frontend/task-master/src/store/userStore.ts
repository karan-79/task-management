import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "USER"; //not sure if this is the correct way
};

type LoggedInUserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useLoggedInUser = create<LoggedInUserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
}));
