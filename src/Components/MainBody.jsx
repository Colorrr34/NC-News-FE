import fetchArticles from "../fetch/fetchArticles";
import fetchTopics from "../fetch/fetchTopics";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function MainBody() {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    fetchArticles(sortBy, order, page).then(({ data }) => {
      setArticles(data.articles);
    });
  }, [sortBy, order]);

  return (
    <>
      <main key="articles">
        <label htmlFor="sort-by-selector">sort by: </label>
        <select
          id="sort-by-selector"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option value="created_at">created at</option>
          <option value="votes">votes</option>
          <option value="comment_count">comments count</option>
        </select>
        <label htmlFor="order-selector">order: </label>
        <select
          id="order-selector"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
        {articles.map((article) => {
          const date = new Date(article.created_at);

          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
            >
              <section id={article.article_id}>
                <h2>{article.title}</h2>
                <p className="article-info">
                  author: {article.author} | comments: {article.comment_count} |
                  votes: {article.votes}
                </p>
                <p className="created-at">Created at: {date.toDateString()}</p>
                <img
                  src={article.article_img_url}
                  alt="article-image"
                  className="homepage-article-image"
                />
              </section>
            </Link>
          );
        })}
      </main>
    </>
  );
}
