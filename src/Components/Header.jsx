import { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { fetchUser, getUsers } from "../fetch/get";
import "../stylesheets/header.css";
import { UserContext } from "../Context/Context";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser(user).then(({ data: { user: userData } }) => {
      setAvatarUrl(userData.avatar_url);
    });

    getUsers().then(({ data: { users } }) => {
      setUsers(users);
    });
  }, [user]);

  return (
    <header>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <ul className="header-user-list">
        {users.map((user) => {
          return (
            <li key={user.username}>
              <label htmlFor={`user-${user.username}`} />
              <button
                id={`user-${user.username}`}
                type="button"
                onClick={() => {
                  setUser(user.username);
                }}
              >
                {user.username}{" "}
              </button>
            </li>
          );
        })}
      </ul>
      <section className="user-banner">
        <p>{user}</p>
        <img src={avatarUrl} alt="user-avatar-picture" id="user-profile" />
      </section>
    </header>
  );
}
