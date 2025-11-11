import axios from "axios";

export default function fetchArticle(articleId) {
  const url =
    "https://rickys-nc-news-be.onrender.com/api/articles/" + articleId;
  return axios.get(url);
}
