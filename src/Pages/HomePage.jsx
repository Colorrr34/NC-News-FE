import { Link } from "react-router";
import SortArticles from "../Sections/SortArticles";
import ArticlesPageList from "../Sections/ArticlesPageList";
import useArticlesData from "../hooks/useArticlesData";
import { useNavigate } from "react-router";
import "./HomePage.css";

export default function MainPage() {
  const { isLoading, articles, pages, error, setError } = useArticlesData();
  const navigate = useNavigate();

  if (error) {
    setTimeout(() => {
      setError(null);
      navigate("/");
    }, 2000);
    return (
      <section>
        <h2>
          {error.status} {error.msg}
        </h2>
        <p>Redirecting...</p>
      </section>
    );
  }
  return (
    <>
      <main key="articles">
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
                className="section-homepage-article"
                key={article.article_id}
              >
                <Link to={`/articles/${article.article_id}`}>
                  <div className="container-single-article">
                    <h2>{article.title}</h2>
                    <p className="article-info">
                      author: {article.author} | comments:{" "}
                      {article.comments_count} | votes: {article.votes}
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

        <ArticlesPageList pages={pages} />
      </main>
    </>
  );
}
