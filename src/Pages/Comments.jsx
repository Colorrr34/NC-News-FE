import ArticleSummary from "../Sections/ArticleSummary";
import Nav from "../Components/Nav";
import SingleComment from "../Sections/SingleComment";
import "./Comments.css";
import CommentsPageList from "../Sections/CommentsPageList";
import CommentInputSection from "../Sections/CommentInputSection";
import { ParentClassContext } from "../Context/ClassContext";
import useArticleSummary from "../hooks/useArticleSummary";
import useCommentsData from "../hooks/useCommentsData";
import { useNavigate } from "react-router";

export default function Comments() {
  const article = useArticleSummary();
  const {
    comments,
    deletedComment,
    setDeletedComment,
    isLoading,
    isCreatingComment,
    setIsCreatingComment,
    setNewComment,
    pages,
    currentPage,
    error,
    setError,
  } = useCommentsData();
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
    return <section className="section-loading">Loading...</section>;
  }
  return (
    <>
      <Nav topic={article.topic} />
      <main className="comments__body">
        <ArticleSummary article={article} />
        <section className="comments__section-3">
          <p>comments:</p>
          <ParentClassContext value="comments__section-3">
            <CommentInputSection
              isCreatingComment={isCreatingComment}
              setIsCreatingComment={setIsCreatingComment}
              setNewComment={setNewComment}
            />
          </ParentClassContext>
        </section>
        {comments.map((comment) => {
          return comment.comment_id === deletedComment ? (
            <section
              key="deleted-comment"
              className="section-deleted-comment-placeholder"
            >
              <p>Comment deleted</p>
            </section>
          ) : (
            <SingleComment
              comment={comment}
              setDeletedComment={setDeletedComment}
              key={`comment-${comment.comment_id}`}
            />
          );
        })}
        <CommentsPageList pages={pages} currentPage={currentPage} />
      </main>
    </>
  );
}
