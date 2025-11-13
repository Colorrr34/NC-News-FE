import { UserContext } from "../Context/Context";
import { useState } from "react";

export function UserProvider({ children }) {
  const [user, setUser] = useState("tickle122");

  return (
    <UserContext value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext>
  );
}
