import { getCommentsByArticle } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { useUsername } from "../Provider/UsernameProvider";
import SingleComment from "./SingleComment";

export default function CommentsInArticle(props) {
  const { id: articleId } = useParams();
  const { newComment, commentCount } = props;
  const { username } = useUsername();
  const [deletedComment, setDeletedComment] = useState(null);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    setTimeout(
      () => {
        getCommentsByArticle(articleId, 3).then(({ data: { comments } }) => {
          setComments(comments);
        });
      },
      deletedComment ? 3000 : 0
    );
  }, [deletedComment]);

  useEffect(() => {
    if (Object.keys(newComment).length > 0) {
      const copy = structuredClone(comments);
      copy.unshift(newComment);
      copy.pop();
      setComments(copy);
    }
  }, [newComment]);

  return (
    <div className="article article--section-3">
      <p>Top Comments</p>
      <ul>
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
      </ul>
      <p>
        <Link to="comments">Read more comments:({commentCount})</Link>
      </p>
    </div>
  );
}
