import { getArticles } from "../api";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import SortArticles from "../Sections/SortArticles";
import ArticlesPageList from "../Sections/ArticlesPageList";

export default function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [pages, setPages] = useState([]);
  const [topic, setTopic] = useState("all");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("p")) || 1);
    setTopic(searchParams.get("topic") || "all");
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, order, currentPage, topic).then(({ data }) => {
      const totalPages = Math.ceil(data.total_count / 10);
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPages(pages);
      setArticles(data.articles);
      setIsLoading(false);
    });
  }, [sortBy, order, currentPage, topic]);

  return (
    <>
      <main key="articles" className="main-main">
        <SortArticles setSortBy={setSortBy} setOrder={setOrder} />
        {isLoading ? (
          <section id="loading-section">
            <h2>Loading...</h2>
          </section>
        ) : (
          articles.map((article) => {
            const date = new Date(article.created_at);

            return (
              <section
                className="main--article-section"
                key={article.article_id}
              >
                <Link to={`/articles/${article.article_id}`}>
                  <div className="main--article-section-container">
                    <h2>{article.title}</h2>
                    <p className="article-info">
                      author: {article.author} | comments:{" "}
                      {article.comment_count} | votes: {article.votes}
                    </p>
                    <p className="created-at">
                      Created at: {date.toDateString()}
                    </p>
                    <img
                      src={article.article_img_url}
                      alt="article-image"
                      className="homepage-article-image"
                    />
                  </div>
                </Link>
              </section>
            );
          })
        )}

        <ArticlesPageList
          pages={pages}
          currentPage={currentPage}
          topic={topic}
        />
      </main>
    </>
  );
}
