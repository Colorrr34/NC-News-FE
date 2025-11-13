import { useState } from "react";
import CommentInputSection from "./CommentInputSection";
import { upvoteArticle, downvoteArticle } from "../API/patch";

export default function CommentAndVoteSection(props) {
  const { votes: articleVotes, user, setNewComment } = props;

  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [votes, setVotes] = useState(articleVotes);

  return (
    <section
      className={
        isCreatingComment
          ? "section-create-comment article--section-2"
          : "article--section-2"
      }
    >
      <CommentInputSection
        setIsCreatingComment={setIsCreatingComment}
        isCreatingComment={isCreatingComment}
        setNewComment={setNewComment}
      />
      <div className="article--section-2-2-votes">
        <label htmlFor="article-upvote">
          <button
            id="article-upvote"
            onClick={() => {
              upvoteArticle(article.articleId);
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
              downvoteArticle(article.articleId);
              setVotes(votes - 1);
            }}
          >
            downvote
          </button>
        </label>

        <p id="article-votes">votes: {votes}</p>
      </div>
    </section>
  );
}
