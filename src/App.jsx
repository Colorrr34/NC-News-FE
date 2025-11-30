import Header from "./Components/Header";
import { Routes, Route } from "react-router";
import "./App.css";
import SideBar from "./Components/SideBar";
import SingleArticle from "./Pages/SingleArticle";
import MainPage from "./Pages/HomePage";
import Comments from "./Pages/Comments";
import { UserProvider } from "./Provider/UsernameProvider";
import { fetchApi } from "./api";

function App() {
  fetchApi();
  return (
    <>
      <UserProvider>
        <Header />

        <div className="body-container">
          <SideBar />
          <div className="content-body">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/articles" element={<MainPage />} />
              <Route path="/articles/:id" element={<SingleArticle />} />
              <Route path="/articles/:id/comments" element={<Comments />} />
            </Routes>
          </div>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
