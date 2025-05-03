import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { uploadImageToCloudinary } from '../utils/uploadImageToCloudinary';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  isLoggedIn: false,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/auth/check');
      set({ authUser: response.data });
      get().connectToSocket();
    } catch (error) {
      console.log('Error in checking auth' + error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
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
      set({ isLoggedIn: true });
      toast.success("Account created successfully.")
      get().connectToSocket();
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
        const message = error.response?.data?.message || "Signup failed, please try again or \n check your internet connection!";
        toast.error(message);
      }

      console.error("Signup error:", error.response?.data || error.message);
      throw error;
    } finally {
      set({ isSigningUp: false })
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
      set({ isLoggedIn: true });
      toast.success("Login successful.");
      
      get().connectToSocket();
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
        const message = error.response?.data?.message || "Login failed, please try again or \n check your internet connection!";
        toast.error(message);
      }

      console.error("Login error:", error.response?.data || error.message);
      throw error;
    } finally {
      set({ isLoggingIn: false })
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const imageUrl = await uploadImageToCloudinary(data.profilePicture);
      
      const res = await axiosInstance.put('/auth/update-profile', {
        profilePicture: imageUrl
      });
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
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  logout: async () => {

    try {
      const res = await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      set({ isLoggedIn: false });
      toast.success(res.data.message);
      console.log(res)
      get().disconnectSocket();

    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      const errors = error.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error.message);
        })

      } else {
        toast.error(errors.response?.data.message || "connection time out");
      }
      throw error;

    }
  },
  connectToSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    console.log("auth user id: ", authUser._id)
    const socket = io('http://localhost:3000', {
      query: {
        userId: authUser._id,
      }
    });

    socket.connect();
    set({socket:socket});

    // get online user from socket
    socket.on('get-online-users',(userIds) => {
      console.log("👥 Online users received:", userIds);
      set({onlineUsers:userIds});
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if(socket?.connected) {
      socket.disconnect();
    };
  }
}));