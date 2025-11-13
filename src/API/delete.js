import axios from "axios";

export function deleteComment(commentId) {
  const url =
    "https://rickys-nc-news-be.onrender.com/api/comments/" + commentId;

  return axios.delete(url);
}
