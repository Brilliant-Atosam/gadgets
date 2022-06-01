import axios from "axios";
// const API_URL = "http://localhost:8001/";
const API_URL = "https://gadgetapi.bongostores.shop/";
export const request = axios.create({
  baseURL: API_URL,
});
