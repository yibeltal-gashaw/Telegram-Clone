import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore =  create((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            set({authUser: response.data});
        } catch (error) {
            console.log('Error in checking auth'+error.message);
            set({authUser: null});    
        } finally {
            set({isCheckingAuth: false});
        }
    },
    signUp: async ({ fullname, username, email, password }) => {
        set({ isSigningUp: true });
      
        try {
          const response = await axiosInstance.post('/auth/signup', {
            fullname,
            username,
            email,
            password,
          });
      
          set({ authUser: response.data });
          toast.success("Account created successfully.")
        } catch (error) {
            set({ authUser: null });
          
            const errors = error.response?.data?.errors;
          
            if (Array.isArray(errors)) {
              // Show each validation message
              errors.forEach((err) => {
                toast.error(err.message); // you could also include the field like `${err.field}: ${err.message}`
              });
            } else {
              // Fallback for non-array error
              const message = error.response?.data?.message || "Signup failed";
              toast.error(message);
            }
          
            console.error("Signup error:", error.response?.data || error.message);
            throw error;
          } finally{
            set({isSigningUp: false})
          }
      }
      
}));