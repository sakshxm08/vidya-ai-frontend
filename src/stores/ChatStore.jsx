// src/stores/chatStore.js
import { create } from "zustand";

export const useChatStore = create((set, get) => ({
  chats: [],
  isLoading: true,
  setIsLoading: (loading) => {
    set({ isLoading: loading });
  },
  setChats: (chats) => {
    set({
      chats,
      isLoading: false,
    });
  },
  setNewChat: (chat) => {
    const { chats } = get();
    set({ chats: [...chats, chat] });
  },
  selectedChat: null,
  setSelectedChat: (chatId) => {
    const { chats } = get();
    const selectedChat = chats.find((c) => c._id === chatId);
    set({ selectedChat });
  },
  addMessage: (chatId, message, role) => {
    const { chats, selectedChat } = get();
    set({
      chats: chats.map((chat) =>
        chat._id === chatId
          ? { ...chat, messages: [...chat.messages, { chatId, message, role }] }
          : chat
      ),
      selectedChat: {
        ...selectedChat,
        messages: [...selectedChat.messages, { chatId, message, role }],
      },
    });
  },
  messageSending: false,
  setMessageSending: (loading) => {
    set({ messageSending: loading });
  },
  setMessages: (messages) => {
    const { selectedChat } = get();
    set({ selectedChat: { ...selectedChat, messages } });
  },
  updateChatTime: (chatId) => {
    const { chats } = get();
    set({
      chats: chats.map((chat) =>
        chat._id === chatId ? { ...chat, updatedAt: Date.now() } : chat
      ),
    });
  },
}));
