import { create, StateCreator } from "zustand";
import Project from "@/features/Project";
import { Simulate } from "react-dom/test-utils";

export type User = {
  id: string;
  name: string;
  username: string;
  role: "ADMIN" | "USER"; //not sure if this is the correct way
};

type LoggedInUserState = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (user: string | null) => void;
};

type ProjectsState = {
  projects: Project[];
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  setProjects: (projects: Project[]) => void;
};

type Store = {
  loggedInUserSlice: LoggedInUserState;
  productsSlice: ProjectsState;
};

// TODO maybe move these slices to the respective dirs
const createLoggedInUserSlice: StateCreator<
  Store,
  [],
  [],
  LoggedInUserState
> = (set) => ({
  user: null,
  token: null,
  setUser: (user: User | null) =>
    set((state) => ({
      ...state,
      loggedInUserSlice: { ...state.loggedInUserSlice, user },
    })),
  setToken: (token: string | null) =>
    set((state) => ({
      ...state.loggedInUserSlice,
      loggedInUserSlice: { ...state.loggedInUserSlice, token },
    })),
});

const createProjectsSlice: StateCreator<Store, [], [], ProjectsState> = (
  set
) => ({
  projects: [],
  addProject: (project: Project) =>
    set((state) => ({
      ...state,
      productsSlice: {
        ...state.productsSlice,
        projects: [...state.productsSlice.projects, project],
      },
    })),
  removeProject: (id: string) =>
    set((state) => {
      return {
        ...state,
        productsSlice: {
          ...state.productsSlice,
          projects: state.productsSlice.projects.filter((p) => p.id !== id),
        },
      };
    }),
  setProjects: (projects) =>
    set((state) => ({
      ...state,
      productsSlice: { ...state.productsSlice, projects },
    })),
});

export const useStore = create<Store>()((...set) => ({
  loggedInUserSlice: createLoggedInUserSlice(...set),
  productsSlice: createProjectsSlice(...set),
}));

type LoggedInUserStateSelector<T> = (state: LoggedInUserState) => T;
export const useLoggedInUser = <T>(fn: LoggedInUserStateSelector<T>) =>
  useStore((state) => fn(state.loggedInUserSlice));

type ProjectsStateSelector<T> = (state: ProjectsState) => T;

export const useProjects = <T>(fn: ProjectsStateSelector<T>) =>
  useStore((state) => fn(state.productsSlice));
