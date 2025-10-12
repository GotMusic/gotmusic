import axios from "axios";
export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.dev.gotmusic.io",
  timeout: 15000,
});
