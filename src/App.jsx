import { useState } from "react";
import Header from "./Components/Header";
import { Routes, Route } from "react-router";
import "./App.css";
import SideBar from "./Components/SideBar";
import ArticleBody from "./Components/ArticleBody";
import MainBody from "./Components/MainBody";
import Comments from "./Components/Comments";

function App() {
  const [user, setUser] = useState("tickle122");

  return (
    <>
      <Header user={user} />
      <div className="body-container">
        <SideBar />
        <div className="content-body">
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/articles" element={<MainBody />} />
            <Route path="/articles/:id" element={<ArticleBody user={user} />} />
            <Route
              path="/articles/:id/comments"
              element={<Comments user={user} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
