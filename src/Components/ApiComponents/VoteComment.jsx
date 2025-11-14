import { upvoteComment, downvoteComment } from "../../api.js";
import { useState } from "react";
import "../../stylesheets/voteComment.css";

export default function VoteComment(props) {
  const { commentId, commentVotes } = props;

  const [votes, setVotes] = useState(commentVotes);

  return (
    <section className="comment-section-votes">
      <label htmlFor="comment-upvote">
        <button
          id="comment-upvote"
          onClick={() => {
            upvoteComment(commentId);
            setVotes(votes + 1);
          }}
        >
          upvote
        </button>
      </label>

      <label htmlFor="comment-downvote">
        <button
          id="comment-downvote"
          onClick={() => {
            downvoteComment(commentId);
            setVotes(votes - 1);
          }}
        >
          downvote
        </button>
      </label>

      <p className="comment-section-votes-p">votes: {votes}</p>
    </section>
  );
}
