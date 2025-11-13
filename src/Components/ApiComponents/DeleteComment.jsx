import { useState } from "react";
import { deleteComment } from "../../API/delete";

export default function DeleteComment(props) {
  const { commentId, setDeletedComment } = props;

  const [tryingToDelete, setTryingToDelete] = useState(false);

  return (
    <section className="section--delete">
      <label htmlFor="delete-comment-button" />
      <button
        id="delete-comment-button"
        className="button--delete-first"
        type="button"
        onClick={() => {
          setTryingToDelete(true);
        }}
      >
        delete comment
      </button>
      {tryingToDelete ? (
        <div className="button--delete-confirm">
          <label htmlFor="delete-confirm-button-positive" />
          <button
            id="delete-confirm-button-positive"
            type="button"
            onClick={() => {
              deleteComment(commentId);
              setDeletedComment(commentId);
            }}
          >
            yes
          </button>
          <label htmlFor="delete-confirm-button-negative" />
          <button
            id="delete-confirm-button-negative"
            type="button"
            onClick={() => {
              setTryingToDelete(false);
            }}
          >
            no
          </button>
        </div>
      ) : null}
    </section>
  );
}
