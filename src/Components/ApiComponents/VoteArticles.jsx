import { upvoteArticle, downvoteArticle } from "../../api";
import { useState } from "react";
import { useParams } from "react-router";

export default function VoteArticles(props) {
  const { id: articleId } = useParams();
  const { articleVotes } = props;
  const [votes, setVotes] = useState(articleVotes);

  return (
    <div className="article--section-2-2-votes">
      <label htmlFor="article-upvote">
        <button
          id="article-upvote"
          onClick={() => {
            upvoteArticle(articleId);
            setVotes(votes + 1);
          }}
        >
          upvote
        </button>
      </label>

      <label htmlFor="article-downvote">
        <button
          id="article-downvote"
          onClick={() => {
            downvoteArticle(articleId);
            setVotes(votes - 1);
          }}
        >
          downvote
        </button>
      </label>

      <p className="signle-article-votes-p">votes: {votes}</p>
    </div>
  );
}
