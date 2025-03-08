import axios from "axios";

const API_URL = "http://localhost:5233/api";
axios.defaults.baseURL = API_URL;

const attendanceApi = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export { attendanceApi }