import fetchArticleComments from "../../fetch/fetchArticleComments";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function CommentsInArticle(props) {
  const { id: articleId } = useParams();
  const { newComment, user } = props;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticleComments(articleId, 3).then(({ data: { comments } }) => {
      const commentsArray = comments.map((comment) => {
        const { created_at, ...otherProperties } = comment;
        const date = new Date(created_at);
        const time = `${
          date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
        }:${
          date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
        } ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        return { created_at: time, ...otherProperties };
      });

      setComments(commentsArray);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(newComment).length > 0) {
      const copy = structuredClone(comments);

      const { created_at, ...otherProperties } = newComment;
      const date = new Date(created_at);
      const time = `${
        date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
      }:${
        date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
      } ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

      copy.unshift({ created_at: time, ...otherProperties });
      copy.pop();

      setComments(copy);
    }
  }, [newComment]);

  return (
    <div className="article article--section-3">
      <p>Top Comments</p>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-section">
              <p className="username">author: {comment.author}</p>
              <p className="comment-body">{comment.body}</p>
              <p className="comment-info">
                votes: {comment.votes} | {comment.created_at}
              </p>
              {user === comment.author ? (
                <DeleteComment commentId={comment.comment_id} />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
