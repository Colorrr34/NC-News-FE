import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchTopics } from "../fetch/get";
import Footer from "./Footer";
import "../stylesheets/sidebar.css";

export default function SideBar() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then(({ data }) => {
      setTopics(data.topics);
    });
  }, []);

  return (
    <aside key="topics-sidebar" id="topics-sidebar">
      <ul key="topic-list">
        {topics.map((topic) => {
          return (
            <li key={topic.slug}>
              <Link to={`/articles?topic=${topic.slug}`}>
                <p>{topic.slug}</p>
              </Link>
            </li>
          );
        })}
      </ul>
      <Footer />
    </aside>
  );
}
