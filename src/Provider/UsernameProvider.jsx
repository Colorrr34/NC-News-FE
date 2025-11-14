import { useContext, useState } from "react";
import { createContext } from "react";

export const UsernameContext = createContext(null);

export function UserProvider({ children }) {
  const [username, setUsername] = useState("tickle122");

  return (
    <UsernameContext value={{ username, setUsername }}>
      {children}
    </UsernameContext>
  );
}

export function useUsername() {
  return useContext(UsernameContext);
}
