import { useState, useEffect } from "react";
import { getUser } from "../api";
import { useUsername } from "../Provider/UsernameProvider";
import guestIcon from "../assets/guest.svg";

export default function useAvatarUrl() {
  const { username } = useUsername();
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (username === "Guest") {
      setAvatarUrl(guestIcon);
    } else {
      getUser(username).then(({ data: { user: userData } }) => {
        setAvatarUrl(userData.avatar_url);
      });
    }
  }, [username]);

  return { avatarUrl };
}
