import { CreateAccountRequest, LoginRequest } from "@/service/types.ts";
import { getData } from "@/utils.ts";
import { http } from "@/config/axiosConfig.ts";
import axios from "axios";
import { boolean } from "zod";
import { User } from "@/store/userStore.ts";

export const createUser = (signUpInfo: CreateAccountRequest) => {
  return axios.post<string>(
    import.meta.env.VITE_BACKEND_BASE_PATH + "/v1/users/create",
    signUpInfo,
  ); //  ignore the response
};

export const verifyLogin = () => {
  return http.get<string>("/v1/auth/validate").then(getData);
};

export const refreshToken = () => {
  return http.get<string>("/v1/auth/refresh-token").then(getData);
};

export const authenticate = (loginCreds: LoginRequest) => {
  const url = import.meta.env.VITE_BACKEND_BASE_PATH + "/v1/auth/token";
  return axios.post<string>(url, loginCreds).then(getData);
};

export const getUserData = () => {
  return http.get<User>("/v1/users").then(getData);
};
