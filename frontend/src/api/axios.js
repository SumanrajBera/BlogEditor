import axios from "axios";
import userStore from "../store/userStore";

const API = axios.create({
    baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((req) => {
    const token = userStore.getState().token;
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;