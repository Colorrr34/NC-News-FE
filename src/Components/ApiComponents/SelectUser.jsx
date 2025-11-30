import { useUsername } from "../../Provider/UsernameProvider";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../../api";

export default function SelectUser() {
  const { setUsername } = useUsername();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(({ data: { users } }) => {
      setUsers(users);
    });
  }, []);

  return (
    <form className="header--select-user--form">
      <label htmlFor="select-user">Select User:</label>
      <select
        className="header-user-list"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      >
        {users.map((user) => {
          return <option key={user.username}>{user.username}</option>;
        })}
      </select>
    </form>
  );
}
