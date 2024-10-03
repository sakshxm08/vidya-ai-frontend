// src/stores/authStore.js
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
}));
