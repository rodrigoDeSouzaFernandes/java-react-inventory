import axios from "axios";

const FIVE_SECONDS_TIMEOUT = 5_000;

const api = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: FIVE_SECONDS_TIMEOUT,
});

export default api;
