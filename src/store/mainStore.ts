import { create } from "zustand";

type State = {
    searchBoxVisible: boolean;
  setSearchBoxVisible: () => any;
};
export const useMainStore = create<State>((set, get) => ({
  searchBoxVisible: false,
  setSearchBoxVisible: () => {
    const { searchBoxVisible } = get();
    set({ searchBoxVisible: !searchBoxVisible });
  },
}));
