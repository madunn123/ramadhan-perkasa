import axiosInstance from "../axios_instance";

export const profileAPI = () => {
  const profile = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axiosInstance.get("/v10/users/@me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const postToken = async (code: string) => {
    try {
      const response = await axiosInstance.post(
        "/oauth2/token",
        new URLSearchParams({
          client_id: "1453612114454384675",
          client_secret: "Sq-uZgl5HR9vY9XWzcWDGlFjfzdf9g98",
          code: code,
          redirect_uri: "http://localhost:5173/", // Pastikan redirect URI benar
          grant_type: "authorization_code",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("accessToken", response.data?.access_token);
      localStorage.setItem("refreshToken", response.data?.refresh_token);

      return response.data;
    } catch (error) {
      console.error("Error posting token:", error);
      throw error;
    }
  };

  return {
    profile,
    postToken,
  };
};
