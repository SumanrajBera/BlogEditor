import { create } from 'zustand';

const useAlertStore = create((set) => ({
  alert: { type: '', message: '' },
  setAlert: (type, message) => set({ alert: { type, message } }),
  clearAlert: () => set({ alert: { type: '', message: '' } }),
}));

export default useAlertStore;
