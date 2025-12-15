import CommentInput from "../Components/ApiComponents/CommentInput";
import { useParentClassContext } from "../Context/ClassContext";
import { useParams } from "react-router";
import { postComment } from "../api";
import { useUsername } from "../Provider/UsernameProvider";
import { useState } from "react";

export default function CommentInputSection(props) {
  const { isCreatingComment, setIsCreatingComment, setNewComment } = props;
  const { id: articleId } = useParams();

  const { username } = useUsername();
  const parentClass = useParentClassContext();

  const [showSubmitMessage, setShowSubmitMessage] = useState(false);

  function submitComment(text) {
    postComment(text, username, articleId).then(({ data: { comment } }) => {
      setNewComment(comment);
    });
    setShowSubmitMessage(true);
  }

  return (
    <>
      <div className={parentClass + "-read-open-comment"}>
        <label htmlFor="create-comment" />
        <button
          id="create-comment"
          onClick={() => {
            setIsCreatingComment(true);
          }}
        >
          create a comment
        </button>
      </div>

      <form
        className={parentClass + "-create-comment"}
        onSubmit={(e) => {
          e.preventDefault();
          submitComment(e.target[0].value);
          e.target[0].value = "";
        }}
      >
        {isCreatingComment ? (
          <CommentInput showSubmitMessage={showSubmitMessage} />
        ) : null}
      </form>
    </>
  );
}
