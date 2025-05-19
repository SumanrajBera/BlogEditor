import { create } from 'zustand';
import useAlertStore from './alertStore';
import API from '../api/axios';

const useBlogStore = create((set) => ({
  blogs: [],
  myBlogs: [],
  fetchBlogs: async () => {
    const setAlert = useAlertStore.getState().setAlert;  // get alert setter
    try {
      const res = await API.get('/blogs');
      set({ blogs: res.data.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch blogs.';
      setAlert('danger', message);
    }
  },

  fetchMyBlogs: async () => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      const res = await API.get('/blogs/myblogs')
      set({ myBlogs: res.data.data })
    } catch (error) {
      if (error.status === 401) {
        setAlert('danger', "You are not logged in!");
      } else {
        setAlert('danger', "Failed to fetch your blogs");
      }
    }
  },

  publishBlog: async (blog) => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      await API.post('/blogs/publish/create', blog)
      setAlert('success', 'Your blog is published')
      return true;
    } catch (error) {
      console.log(error.response)
      setAlert('danger', error.response?.data?.error || "Your blog couldn't be published")
    }
  },
  draftBlog: async (blog) => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      await API.post('/blogs/save-draft/create', blog)
      setAlert('success', 'Your draft was created')
      return true;
    } catch (error) {
      setAlert('danger', error.response?.data?.error || "Your draft couldn't be created")
    }
  },
  updateDraft: async (blog) => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      await API.post('/blogs/save-draft/update', blog)
      setAlert('success', 'Your draft was updated')
      return true;
    } catch (error) {
      setAlert('danger', error.response?.data?.message || "Your draft couldn't be updated")
    }
  },
  updateAndPublish: async (blog) => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      await API.post('/blogs/publish/update', blog)
      setAlert('success', 'Your blog was updated and published')
      return true;
    } catch (error) {
      setAlert('danger', error.response?.data?.message || "Your blog couldn't be updated and published")
    }
  },
  deleteBlog: async (blogId) => {
    const setAlert = useAlertStore.getState().setAlert;
    try {
      await API.delete(`/blogs/${blogId}`)
      setAlert('success', 'Your blog is deleted')
      set((state) => ({
        myBlogs: state.myBlogs.filter((blog) => blog._id !== blogId)
      }));
    } catch (error) {
      setAlert('danger', "Your blog couldn't be deleted")
    }
  }
}));

export default useBlogStore;