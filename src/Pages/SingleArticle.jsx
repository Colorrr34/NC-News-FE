import { useState } from "react";
import Nav from "../Components/Nav";
import CommentAndVoteSection from "../Sections/CommentAndVoteSection";
import "./SingleArticle.css";
import ArticleComments from "../Sections/ArticleComments";
import useSingleArticle from "../hooks/useSingleArticle";
import { useNavigate } from "react-router";

export default function SingleArticle() {
  const [newComment, setNewComment] = useState({});
  const { article, isLoading, error, setError } = useSingleArticle();
  const navigate = useNavigate();

  if (error) {
    setTimeout(() => {
      setError(null);
      navigate("/");
    }, 2000);
    return (
      <section className="section-error">
        <h2>{error.msg}</h2>
        <p>Redirecting...</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section>
        <h3>Loading...</h3>
      </section>
    );
  }

  return (
    <>
      <Nav topic={article.topic} />
      <main>
        <article className="article article--section-1">
          <h2>{article.title}</h2>
          <p>
            Author: {article.author} | Created at: {article.createdAt}
          </p>
          <img src={article.article_img_url} alt="article-image" />
          <p>{article.body}</p>
        </article>
        <CommentAndVoteSection
          setNewComment={setNewComment}
          votes={article.votes}
        />
        <ArticleComments
          newComment={newComment}
          commentCount={article.comment_count}
        />
      </main>
    </>
  );
}
