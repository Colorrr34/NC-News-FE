import { useParams, Link, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import fetchArticle from "../../fetch/fetchArticle";
import fetchArticleComments from "../../fetch/fetchArticleComments";

export default function Comments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetchArticle(articleId).then(({ data }) => {
      setArticle(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("p")) || 1);
  }, [searchParams]);

  useEffect(() => {
    fetchArticleComments(articleId, 10, currentPage).then(({ data }) => {
      const totalPages = Math.ceil(data.total_count / 10);
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      setPages(pages);
      setComments(data.comments);
    });
  }, []);

  return (
    <main className="comments-body">
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
      <p>comments:</p>
      {comments.map((comment) => {
        return (
          <section
            key={`comment-${comment.comment_id}`}
            className="comment-section"
          >
            <p className="username">author: {comment.author}</p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-info">
              votes: {comment.votes} | {comment.created_at}
            </p>
          </section>
        );
      })}
    </main>
  );
}
