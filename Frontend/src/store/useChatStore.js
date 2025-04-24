import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    isUsersLoading: false,
    ismessagesLoading: false,
    selectedUser: null,
    
    
    getUsers: async () => {
        set({isUsersLoading: true});
        try {
        const res = await axiosInstance.get('/messages/users');
        set({users: res.data});
        } catch (error) {
            console.log(error);

        }finally {
            set({isUsersLoading: false});
        }

    },
    getMessages: async (userId) => {
        set({ismessagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            console.log(error);
        }finally {
            set({ismessagesLoading: false});
        }
    },
    setSelectedUser: (selectedUser) => set({selectedUser}),
}));