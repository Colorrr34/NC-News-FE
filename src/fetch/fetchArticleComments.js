import axios from "axios";

export default function fetchArticleComments(articleId, limit = 10, page = 1) {
  const url =
    `https://rickys-nc-news-be.onrender.com/api/articles/${articleId}/comments` +
    `?p=${page}&limit=${limit}`;

  return axios.get(url);
}
