import axios from "axios";

const baseUrl = "https://rickys-nc-news-be.onrender.com/api/";

export function getTopics() {
  return axios.get(baseUrl + "topics");
}

export function getUser(username) {
  const url = `${baseUrl}users/${username}`;
  return axios.get(url);
}

export function getArticle(articleId) {
  const url = `${baseUrl}articles/${articleId}`;
  return axios.get(url);
}

export function getArticles(sortBy, order, page, topic) {
  const topicQuery = topic === "all" ? "" : `&topic=${topic}`;
  const url = `${baseUrl}articles?sort_by=${sortBy}&order=${order}&p=${page}${topicQuery}`;
  return axios.get(url);
}

export function getCommentsByArticle(articleId, limit = 10, page = 1) {
  const url = `${baseUrl}articles/${articleId}/comments?p=${page}&limit=${limit}`;

  return axios.get(url);
}

export function getUsers() {
  const url = `${baseUrl}users`;

  return axios.get(url);
}
