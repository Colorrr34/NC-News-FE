import axios from "axios";

const baseUrl = "https://rickys-nc-news-be.onrender.com/api/";

export function fetchTopics() {
  return axios.get(baseUrl + "topics");
}

export function fetchUser(username) {
  const url = `${baseUrl}users/${username}`;
  return axios.get(url);
}

export function fetchArticle(articleId) {
  const url = `${baseUrl}articles/${articleId}`;
  return axios.get(url);
}

export function fetchArticles(sortBy, order, page, topic) {
  const topicQuery = topic === "all" ? "" : `&topic=${topic}`;
  const url = `${baseUrl}articles?sort_by=${sortBy}&order=${order}&p=${page}${topicQuery}`;
  return axios.get(url);
}

export function fetchArticleComments(articleId, limit = 10, page = 1) {
  const url = `${baseUrl}articles/${articleId}/comments?p=${page}&limit=${limit}`;

  return axios.get(url);
}

export function getUsers() {
  const url = `${baseUrl}users`;

  return axios.get(url);
}
