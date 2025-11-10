import fetchArticles from "../fetch/fetchArticles";
import { useState, useEffect } from "react";

export default function MainBody() {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles(page).then(({ data }) => {
      setArticles(data.articles);
      console.log(data.articles[0]);
    });
  }, []);

  return (
    <>
      <main key="articles">
        {articles.map((article) => {
          const date = new Date(article.created_at);

          return (
            <section key={article.article_id} id={article.article_id}>
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
          );
        })}
      </main>
    </>
  );
}
