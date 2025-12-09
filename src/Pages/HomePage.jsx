import { Link } from "react-router";
import SortArticles from "../Sections/SortArticles";
import ArticlesPageList from "../Sections/ArticlesPageList";
import useArticlesData from "../hooks/useArticlesData";
import "./HomePage.css";

export default function MainPage() {
  const { isLoading, articles, pages, currentPage, topic } = useArticlesData();

  return (
    <>
      <main key="articles" className="main-main">
        <SortArticles />
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
