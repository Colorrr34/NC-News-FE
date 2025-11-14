import { useState, useEffect } from "react";
import { getUser } from "../api";
import { useUsername } from "../Provider/UsernameProvider";

export default function useAvatarUrl() {
  const { username } = useUsername();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUser(username).then(({ data: { user: userData } }) => {
      setAvatarUrl(userData.avatar_url);
    });
  }, [username]);

  return avatarUrl;
}
