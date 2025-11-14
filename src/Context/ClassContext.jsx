import { createContext, useContext } from "react";

export const ParentClassContext = createContext(null);

export function useParentClassContext() {
  return useContext(ParentClassContext);
}
