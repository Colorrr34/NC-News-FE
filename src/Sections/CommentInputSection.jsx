import CommentInput from "../Components/ApiComponents/CommentInput";

export default function CommentInputSection(props) {
  const { isCreatingComment, setIsCreatingComment, setNewComment } = props;

  return (
    <>
      <div className="article--section-2-1-read-open-comment">
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

      <div className="article--section-2-3-create-comment">
        {isCreatingComment ? (
          <CommentInput setNewComment={setNewComment} />
        ) : null}
      </div>
    </>
  );
}
