import fetchArticleComments from "../../fetch/fetchArticleComments";
import { useState, useEffect } from "react";

export default function Comments(props) {
  const { articleId } = props;

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

  return (
    <>
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id} className="comment-section">
            <p className="username">author: {comment.author}</p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-info">
              votes: {comment.votes} | {comment.created_at}
            </p>
          </section>
        );
      })}
    </>
  );
}
