import { useState } from "react";
import Header from "./Components/Header";

import "./App.css";

function App() {
  const [user, setUser] = useState("no user");
  return (
    <>
      <Header user={user} />
      {/* <Nav />
      <Body />
      <Footer /> */}
    </>
  );
}

export default App;
