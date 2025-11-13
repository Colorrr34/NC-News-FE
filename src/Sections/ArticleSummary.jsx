import { Link, useParams } from "react-router";

export default function ArticleSummary(props) {
  const { article } = props;
  return (
    <>
      <p>Parent article:</p>
      <Link to={`/articles/${article.article_id}`} key={article.article_id}>
        <section className="article-section">
          <h2>{article.title}</h2>
          <p className="article-info">
            author: {article.author} | comments: {article.comment_count} |
            votes: {article.votes}
          </p>
          <img
            src={article.article_img_url}
            alt="article-image"
            className="homepage-article-image"
          />{" "}
        </section>
      </Link>
    </>
  );
}
