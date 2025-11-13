import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState("tickle122");

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}
