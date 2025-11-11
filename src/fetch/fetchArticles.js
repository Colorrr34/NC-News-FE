import axios from "axios";

export default function fetchArticles(sortBy, order, page, topic) {
  const topicQuery = topic === "all" ? "" : `&topic=${topic}`;
  const url = `https://rickys-nc-news-be.onrender.com/api/articles?sort_by=${sortBy}&order=${order}&p=${page}${topicQuery}`;
  return axios.get(url);
}
