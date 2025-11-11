import axios from "axios";

export default function fetchArticles(sortBy, order, page) {
  const url = `https://rickys-nc-news-be.onrender.com/api/articles?sort_by=${sortBy}&order=${order}&p=${page}`;
  return axios.get(url);
}
