import { create } from "zustand";
import { persist } from 'zustand/middleware'
import useAlertStore from './alertStore';
import API from "../api/axios";

const userStore = create(persist((set) => ({
  user: {},
  token: "",
  signup: async (credentials) => {
    const { setAlert } = useAlertStore.getState();
    try {
      const res = await API.post('/user/register', credentials);
      setAlert('success', 'Signup successful!');
      return res;
    } catch (error) {
      setAlert('danger', error.response?.data?.error || 'Signup failed');
    }
  },

  login: async (credentials) => {
    const { setAlert } = useAlertStore.getState();
    try {
      const res = await API.post('/user/login', credentials);
      const { user, token } = res.data;
      set({ user, token });
      setAlert('success', `Welcome back ${user.username}!`);
      return true
    } catch (error) {
      console.log(error)
      setAlert('danger', error.response?.data?.message || 'Login failed');
    }
  }
}),
  {
    name: "user-storage",
    getStorage: () => localStorage,
    onRehydrateStorage: () => (state) => {
      state.hasHydrated = true;
    }
  }
))



export default userStore;
