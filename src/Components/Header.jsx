import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { getUser } from "../api";
import "../stylesheets/header.css";
import { useUsername } from "../Provider/UsernameProvider";
import SelectUser from "./ApiComponents/SelectUser";

export default function Header() {
  const { username } = useUsername();

  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUser(username).then(({ data: { user: userData } }) => {
      setAvatarUrl(userData.avatar_url);
    });
  }, [username]);

  return (
    <header>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <section className="header--user-section">
        <SelectUser />
        <section className="user-banner">
          <p>{username}</p>
          <img
            src={avatarUrl}
            alt="user-avatar-picture"
            className="img-user-profile"
          />
        </section>
      </section>
    </header>
  );
}
