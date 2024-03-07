import axios, { AxiosInstance } from "axios";
import { baseURL } from "./config"; 

const api: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 8000,
});

export default api;
