import { upvoteArticle, downvoteArticle } from "../../api";
import { useState } from "react";
import { useParams } from "react-router";
import "./VoteArticles.css";

export default function VoteArticles(props) {
  const { id: articleId } = useParams();
  const { articleVotes } = props;
  const [votes, setVotes] = useState(articleVotes);
  const [error, setError] = useState(null);

  return (
    <div className="section-votes">
      <label htmlFor="article-upvote">
        <button
          id="article-upvote"
          onClick={() => {
            upvoteArticle(articleId)
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
      <label htmlFor="article-downvote">
        <button
          id="article-downvote"
          onClick={() => {
            downvoteArticle(articleId)
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
      <p className="p-votes">votes: {votes}</p>
      {error ? <p className="p-error">Vote failed</p> : null}
    </div>
  );
}
