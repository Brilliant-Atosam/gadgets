import axios from "axios";
const API_URL = "http://localhost:8000/";
export const request = axios.create({
  baseURL: API_URL,
});
