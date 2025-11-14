import { Link } from "react-router";
import "../stylesheets/header.css";
import { useUsername } from "../Provider/UsernameProvider";
import SelectUser from "./ApiComponents/SelectUser";
import useAvatarUrl from "../hooks/useAvatarUrl";

export default function Header() {
  const { username } = useUsername();
  const avatarUrl = useAvatarUrl();

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
