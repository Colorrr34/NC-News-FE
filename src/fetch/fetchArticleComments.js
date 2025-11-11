import axios from "axios";

export default function fetchArticleComments(articleId, limit) {
  const limitQuery = limit ? `?limit=${limit}` : "";
  const url =
    "https://rickys-nc-news-be.onrender.com/api/articles/" +
    articleId +
    "/comments" +
    limitQuery;

  return axios.get(url);
}
