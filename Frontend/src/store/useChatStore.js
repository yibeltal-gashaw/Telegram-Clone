import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary.js'
// Initialize Socket.IO Client

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    isUsersLoading: false,
    ismessagesLoading: false,
    selectedUser: null,
    unSeenMessage: null,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get('/messages/users');
            set({ users: res.data });
        } catch (error) {
            console.log(error);

        } finally {
            set({ isUsersLoading: false });
        }

    },
    getMessages: async (userId) => {
        set({ ismessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            console.log(error);
        } finally {
            set({ ismessagesLoading: false });
        }
    },
    sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            let imageUrl = ""
            // upload image to cloudinary
            if (messageData.image) {
                imageUrl = await uploadImageToCloudinary(messageData.image);
            }
            // Send message to your backend
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
                text: messageData.text,
                image: imageUrl
            });

            // Add new message to the store
            set({ messages: [...messages, res.data] });

        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || error.message);
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    // Listen for new messages from other users in real-time
    listenForMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("new-message", (message) => {
            const { messages } = get();
            set({ messages: [...messages, message] });
        });
    },
    forgetMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('new-message');
    },
    countUnseenMessages: async (userId) => {
        try {
            const response = await axios.get(`/api/messages/unseen-count/${userId}`);
            const unseenCount = response.data.count;
            set({unseenCount:unseenCount})
        } catch (error) {
            console.error("Error counting unseen messages:", error);
            return 0; // In case of error, return 0
        }
    }
}));