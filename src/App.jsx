import { useState } from "react";
import Header from "./Components/Header";
import { Routes, Route } from "react-router";
import "./App.css";
import ArticleBody from "./Components/ArticleBody";
import MainBody from "./Components/MainBody";
import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState("no user");
  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route
          path="/articles/:id"
          element={
            <>
              <ArticleBody />
            </>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
