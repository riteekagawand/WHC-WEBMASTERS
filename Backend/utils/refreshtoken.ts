import axios from "axios";

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) throw new Error("No refresh token found");

    const response = await axios.post("http://localhost:5000/api/refresh", { refreshToken });

    if (response.data?.accessToken) {
      return response.data.accessToken;
    }

    return null;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
