import axios, { AxiosError } from "axios";

import { parseCookies } from "nookies";

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@barber.token"]}`,
    },
  });

  api.interceptors.response.use((res) => {
    return res;
  });
}
