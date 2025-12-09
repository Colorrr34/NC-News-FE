import { upvoteComment, downvoteComment } from "../../api.js";
import { useState } from "react";
import "./VoteComment.css";

export default function VoteComment(props) {
  const { commentId, commentVotes } = props;

  const [votes, setVotes] = useState(commentVotes);
  const [error, setError] = useState(null);

  return (
    <section className="comment-section-votes">
      <label htmlFor="comment-upvote">
        <button
          id="comment-upvote"
          onClick={() => {
            upvoteComment(commentId)
              .then(() => {
                setVotes(votes + 1);
              })
              .catch((err) => {
                setError(err);
              });
          }}
        >
          upvote
        </button>
      </label>

      <label htmlFor="comment-downvote">
        <button
          id="comment-downvote"
          onClick={() => {
            downvoteComment(commentId)
              .then(() => {
                setVotes(votes - 1);
              })
              .catch((err) => {
                setError(err);
              });
          }}
        >
          downvote
        </button>
      </label>
      <p className="comment-section-votes-p">votes: {votes}</p>
      {error ? <p className="p-error">Vote failed</p> : null}
    </section>
  );
}
