import { create } from 'zustand';

const useQaStore = create((set, get) => ({
  messages: [],
  pendingAIMessage: null,

  setPendingAIMessage: (message) => set({ pendingAIMessage: message }),

  clearPendingAIMessage: () => set({ pendingAIMessage: null }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),

  clearMessages: () => set({ messages: [] }),
}));

export default useQaStore;
