import { Link } from "react-router";
import "./Header.css";
import { useUsername } from "../Provider/UsernameProvider";
import SelectUser from "./ApiComponents/SelectUser";
import useAvatarUrl from "../hooks/useAvatarUrl";
import Logo from "../assets/newspaper.svg";

export default function Header() {
  const { username } = useUsername();
  const avatarUrl = useAvatarUrl();

  return (
    <header>
      <Link to="/">
        <h1 className="header__section-logo">
          <img className="header__img" alt="logo" src={Logo} />
          NC News
        </h1>
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
