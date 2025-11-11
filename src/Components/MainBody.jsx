import fetchArticles from "../fetch/fetchArticles";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";

export default function MainBody() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [pages, setPages] = useState([]);
  const [topic, setTopic] = useState("all");

  useEffect(() => {
    setCurrentPage(searchParams.get("p") || 1);
    setTopic(searchParams.get("topic") || "all");
  }, [searchParams]);

  useEffect(() => {
    fetchArticles(sortBy, order, currentPage, topic).then(({ data }) => {
      const totalPages = Math.ceil(data.total_count / 10);
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPages(pages);
      setArticles(data.articles);
    });
  }, [sortBy, order, currentPage, topic]);

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

        <ul className="main-page-list">
          {pages.map((page) => {
            if (page === Number(currentPage)) {
              return <li key="current-page">{page}</li>;
            }
            return (
              <li key={`main-page-${page}`}>
                <Link
                  relative="path"
                  to={`?${topic === "all" ? "" : `topic=${topic}&`}p=${page}`}
                >
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
