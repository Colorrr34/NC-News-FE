import { useState } from "react";
import CommentInputSection from "./CommentInputSection";
import VoteArticles from "../Components/ApiComponents/VoteArticles";
import { ParentClassContext } from "../Context/ClassContext";

export default function CommentAndVoteSection(props) {
  const { votes: articleVotes, setNewComment } = props;

  const [isCreatingComment, setIsCreatingComment] = useState(false);

  return (
    <section
      className={
        isCreatingComment
          ? "section-create-comment article--section-2"
          : "article--section-2"
      }
    >
      <ParentClassContext value="article--section-2">
        <CommentInputSection
          setIsCreatingComment={setIsCreatingComment}
          isCreatingComment={isCreatingComment}
          setNewComment={setNewComment}
        />
      </ParentClassContext>
      <VoteArticles articleVotes={articleVotes} />
    </section>
  );
}
