import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    isUsersLoading: false,
    ismessagesLoading: false,
    selectedUser: null,


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
    sendMessages: async (messagedata) => {
        const { selectedUser, messages } = get();
        try {

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messagedata);
            set({messages:[...messages,res.data]})
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response.data.message)
        }
    },
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));