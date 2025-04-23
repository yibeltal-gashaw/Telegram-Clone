import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';

export const useAuthStore =  create((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,

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
      },
      login: async ({ email, password }) => {
        set({ isLoggingIn: true });

        try {
          const response = await axiosInstance.post('/auth/login', {
            email,
            password,
          });

          set({ authUser: response.data });
          toast.success("Login successful.");
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
              const message = error.response?.data?.message || "Login failed";
              toast.error(message);
            }

            console.error("Login error:", error.response?.data || error.message);
            throw error;
          } finally{
            set({isLoggingIn: false})
          }
      },

      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put('/auth/update-profile', data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully.");
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
            const message = error.response?.data?.message || "Image Uploading failed";
            toast.error(message);
          }
        
          console.error("Image Uploading Error:", error.response?.data || error.message);
          throw error;
        } finally{
          set({isUpdatingProfile: false})
        }
      }
}));