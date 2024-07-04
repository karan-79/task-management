import axios, { AxiosHeaders } from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_PATH, // put through env
  headers: {
    "Content-Type": "application/json",
  },
});
