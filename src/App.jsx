import { useState } from "react";
import Header from "./Components/Header";
import { Routes, Route } from "react-router";
import "./App.css";
import SideBar from "./Components/SideBar";
import ArticleBody from "./Components/ArticleBody";
import MainBody from "./Components/MainBody";

function App() {
  const [user, setUser] = useState("tickle122");

  return (
    <>
      <Header user={user} />
      <div className="body-container">
        <SideBar />
        <div className="main-body">
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/articles" element={<MainBody />} />
            <Route
              path="/articles/:id"
              element={
                <>
                  <ArticleBody />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
