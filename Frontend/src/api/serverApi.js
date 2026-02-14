import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://www.jobiffi.com/",
  timeout: 10000, //10s
  withCredentials: true,
});

export const getServerResponse = async () => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
