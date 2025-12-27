import axios from "axios";

// Mengambil token yang tersimpan dari localStorage
let accessToken = localStorage.getItem("accessToken") ?? "";
let refreshToken = localStorage.getItem("refreshToken") ?? "";

const axiosInstance = axios.create({
  baseURL: "https://discord.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk refresh access token
const refreshAccessToken = async () => {
  try {
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(
      "https://discord.com/api/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "1453612114454384675", // Client ID yang benar
        client_secret: "Sq-uZgl5HR9vY9XWzcWDGlFjfzdf9g98", // Client Secret yang benar
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Menyimpan access token dan refresh token yang baru
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing token", error);
    throw error;
  }
};

// Menambahkan header Authorization pada setiap request
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menangani error 401 dan mencoba refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();

        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(error.config); // Mengulang request dengan token baru
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        return Promise.reject(refreshError); // Menangani kegagalan refresh token
      }
    }

    return Promise.reject(error); // Menangani error lainnya
  }
);

export default axiosInstance;
