// src/stores/authStore.js
import { create } from "zustand";
import api from "../api/api";
import { useChatStore } from "./ChatStore"; // Import the chat store

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  refresh: async () => {
    try {
      const res = await api.get("/auth/refresh");
      const { user, chats, newChat } = res.data; // Assuming the API returns both user and chats

      // Set the user data in auth store
      set({ user, loading: false });
      console.log(newChat);
      // Set the chats directly in the chat store
      const chatsState = useChatStore.getState(); // Access setChats from chatStore
      chatsState.setChats(chats); // Set the chats in chat store
      chatsState.setSelectedChat(newChat?._id); // Set the chats in chat store
      return newChat._id;
    } catch (error) {
      console.log(error);
      set({ user: null, loading: false });
    }
  },
  logout: () => set({ user: null }),
  login: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));
