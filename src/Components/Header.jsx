import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { getUser } from "../API/get";
import "../stylesheets/header.css";
import { UserContext } from "../Provider/Provider";
import SelectUser from "./ApiComponents/SelectUser";

export default function Header() {
  const { user } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUser(user).then(({ data: { user: userData } }) => {
      setAvatarUrl(userData.avatar_url);
    });
  }, [user]);

  return (
    <header>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <section className="header--user-section">
        <SelectUser />
        <section className="user-banner">
          <p>{user}</p>
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
