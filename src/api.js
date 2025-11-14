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

export function deleteComment(commentId) {
  const url = `${baseUrl}comments/${commentId}`;

  return axios.delete(url);
}

export function postComment(text, username, articleId) {
  const url = baseUrl + `articles/${articleId}/comments`;
  return axios.post(url, { body: text, author: username });
}

export function upvoteArticle(articleId) {
  const url = `${baseUrl}articles/${articleId}`;
  return axios.patch(url, { inc_votes: 1 });
}
export function downvoteArticle(articleId) {
  const url = `${baseUrl}articles/${articleId}`;
  return axios.patch(url, { inc_votes: -1 });
}

export function upvoteComment(commentId) {
  const url = `${baseUrl}comments/${commentId}`;
  return axios.patch(url, { inc_votes: 1 });
}

export function downvoteComment(commentId) {
  const url = `${baseUrl}comments/${commentId}`;
  return axios.patch(url, { inc_votes: -1 });
}
