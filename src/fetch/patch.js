import axios from "axios";

export function upvoteArticle(articleId) {
  const url =
    "https://rickys-nc-news-be.onrender.com/api/articles/" + articleId;
  return axios.patch(url, { inc_votes: 1 });
}
export function downvoteArticle(articleId) {
  const url =
    "https://rickys-nc-news-be.onrender.com/api/articles/" + articleId;
  return axios.patch(url, { inc_votes: -1 });
}
