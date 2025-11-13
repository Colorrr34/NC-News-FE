import CreateComment from "../Components/FunctionalComponents/CreateComment";
import { UserProvider } from "../Provider/Provider";

export default function CreateCommentSection(props) {
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
          <UserProvider>
            <CreateComment setNewComment={setNewComment} />
          </UserProvider>
        ) : null}
      </div>
    </>
  );
}
