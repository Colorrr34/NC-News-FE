import { useParams, Link, useSearchParams } from "react-router";
import { useState, useEffect, useContext } from "react";
import { getCommentsByArticle, getArticle } from "../API/get";
import ArticleSummary from "../Sections/ArticleSummary";
import Nav from "./Nav";
import DeleteComment from "./ApiComponents/DeleteComment";
import "../stylesheets/comments.css";
import { UserContext } from "../Provider/Provider";

export default function Comments() {
  const { user } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: articleId } = useParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("p") ? Number(searchParams.get("p")) : 1
  );
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState([]);
  const [deletedComment, setDeletedComment] = useState(null);

  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticle(articleId).then(({ data }) => {
      setArticle(data);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("p")) {
      setCurrentPage(Number(searchParams.get("p")));
    }
  }, [searchParams]);

  useEffect(() => {
    setTimeout(
      () => {
        getCommentsByArticle(articleId, 10, currentPage).then(({ data }) => {
          const totalPages = Math.ceil(data.total_count / 10);
          const pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          setPages(pages);
          setComments(data.comments);
          setDeletedComment(null);
        });
      },
      deletedComment ? 3000 : 0
    );
  }, [currentPage, deletedComment]);

  return (
    <>
      <Nav topic={article.topic} />
      <main className="comments-body">
        <ArticleSummary article={article} />
        <p>comments:</p>
        {comments.map((comment) => {
          return comment.comment_id === deletedComment ? (
            <section
              key="deleted-comment"
              className="section-deleted-comment-placeholder"
            >
              <p>Comment deleted</p>
            </section>
          ) : (
            <section
              key={`comment-${comment.comment_id}`}
              className="comment-section"
            >
              <p className="username">author: {comment.author}</p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-info">
                votes: {comment.votes} | {comment.created_at}
              </p>
              {user === comment.author ? (
                <DeleteComment
                  commentId={comment.comment_id}
                  setDeletedComment={setDeletedComment}
                />
              ) : null}
            </section>
          );
        })}
        <ul className="page-list">
          {pages.map((page) => {
            if (page === currentPage) {
              return <li key="current-page">{page}</li>;
            }
            return (
              <li key={`main-page-${page}`}>
                <Link relative="path" to={`?p=${page}`}>
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
