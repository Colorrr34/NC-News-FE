import { Link } from "react-router";
import "./Header.css";
import { useUsername } from "../Provider/UsernameProvider";
import SelectUser from "./ApiComponents/SelectUser";
import useAvatarUrl from "../hooks/useAvatarUrl";
import Logo from "../assets/newspaper.svg";

export default function Header() {
  const { username } = useUsername();
  const { avatarUrl, setAvatarUrl } = useAvatarUrl();

  return (
    <header>
      <section className="section-logo">
        <Link to="/">
          <div className="container-logo">
            <img className="header__img" alt="logo" src={Logo} />
            <h1>NC News</h1>
          </div>
        </Link>
      </section>
      <section className="header--user-section">
        <SelectUser />
        <section className="user-banner">
          <p>{username}</p>
          <img
            src={avatarUrl}
            alt="user-avatar"
            className="img-user-profile"
            onError={(err) => {
              console.log(err);
            }}
          />
        </section>
      </section>
    </header>
  );
}
