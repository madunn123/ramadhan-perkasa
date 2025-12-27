/* eslint-disable react-hooks/exhaustive-deps */
import { profileAPI } from "@/service/me/me.api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

type UserProfile = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

export default function MainPage() {
  const { postToken, profile } = profileAPI();
  const location = useLocation();

  const [userData, setUserData] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCodeFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("code");
  };

  const fetchProfile = async () => {
    try {
      const data = await profile();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Error fetching profile");
      setLoading(false);
    }
  };

  useEffect(() => {
    const code = getCodeFromURL();

    if (code) {
      postToken(code)
        .then(() => {
          fetchProfile();
        })
        .catch((error) => {
          console.error("Error getting token:", error);
          setError("Error getting token");
          setLoading(false);
        });
    }
  }, [location.search]);

  return (
    <div>
      <div>Data GET:</div>
      {loading && <p>Loading...</p>}{" "}
      {/* Menampilkan loading saat data sedang diambil */}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Menampilkan error jika ada */}
      {userData && (
        <div>
          <h3>Profile Information:</h3>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <img
            src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`}
            alt="Avatar"
            width="100"
            height="100"
          />
        </div>
      )}
      <div className="bg-red-600 p-3">
        <button>Token Berhasil Diperoleh</button>
      </div>
    </div>
  );
}
    