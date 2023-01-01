import axios, { AxiosError } from "axios";

import { parseCookies } from "nookies";

import { AuthTokenError } from "./errors/AuthTokenError";

import { signOut } from "../contexts/AuthContext";

import cors from "cors";

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@barber.token"]}`,
    },
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    (err: AxiosError) => {
      if (err.response.status === 401) {
        if (typeof window !== undefined) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(err);
    }
  );

  return api;
}
