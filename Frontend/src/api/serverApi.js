import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
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

export const employerRegister = async (formData) => {
  try {
    const response = await axiosInstance.post(
      "/api/employer/register",
      formData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/google/oauth`;
};

export const handleLinkedInLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/linkedin`;
};

export const registerCandidate = async (formData) => {
  return await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/auth/register`, formData);
};
