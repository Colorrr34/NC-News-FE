import ArticleSummary from "../Sections/ArticleSummary";
import Nav from "./Nav";
import SingleComment from "../Sections/SingleComment";
import "../stylesheets/comments.css";
import CommentsPageList from "../Sections/CommentsPageList";
import CommentInputSection from "../Sections/CommentInputSection";
import { ParentClassContext } from "../Context/ClassContext";
import useArticleSummary from "../hooks/useArticleSummary";
import useCommentsData from "../hooks/useCommentsData";

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
  } = useCommentsData();

  return isLoading ? (
    <section className="section-loading">Loading...</section>
  ) : (
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
