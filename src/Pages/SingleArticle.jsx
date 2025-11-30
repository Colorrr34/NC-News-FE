import { useState } from "react";
import Nav from "../Components/Nav";
import CommentAndVoteSection from "../Sections/CommentAndVoteSection";
import "./SingleArticle.css";
import ArticleComments from "../Sections/ArticleComments";
import useSingleArticle from "../hooks/useSingleArticle";

export default function SingleArticle() {
  const [newComment, setNewComment] = useState({});
  const { article, isLoading, status, errorMsg } = useSingleArticle();

  return isLoading ? (
    <section>
      <h3>Loading...</h3>
    </section>
  ) : status !== 200 ? (
    <section className="section-error">
      <p>{errorMsg}</p>
    </section>
  ) : (
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
