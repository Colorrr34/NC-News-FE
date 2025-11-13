import { UserContext } from "../../Provider/Provider";
import { useEffect, useState, useContext } from "react";
import { getUsers } from "../../API/get";

export default function SelectUser() {
  const { setUser } = useContext(UserContext);
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
          setUser(e.target.value);
        }}
      >
        {users.map((user) => {
          return <option key={user.username}>{user.username}</option>;
        })}
      </select>
    </form>
  );
}
