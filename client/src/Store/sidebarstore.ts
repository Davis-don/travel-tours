import { create } from 'zustand';

interface FormState {
  sideBar: boolean;
  toggleSidebar: () => void;
}

const useSidebarStore = create<FormState>((set) => ({
  sideBar: false,

  toggleSidebar: () => {
    set((state) => ({
      sideBar: !state.sideBar,
    }));
  },
}));

export default useSidebarStore;