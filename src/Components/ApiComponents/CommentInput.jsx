import { useUsername } from "../../Provider/UsernameProvider";

export default function CommentInput(props) {
  const { username } = useUsername();
  const { showSubmitMessage } = props;

  if (username === "Guest") {
    return <p>Please select a user to leave comment.</p>;
  }

  return (
    <>
      <label htmlFor="comment-input" />
      <textarea
        id="comment-input"
        type="text"
        required
        placeholder={`Commenting as ${username}`}
      ></textarea>

      <label htmlFor="submit-comment" />
      <button id="submit-comment" type="submit" className="button">
        Submit
      </button>
      {showSubmitMessage ? <p>comment submitted!</p> : null}
    </>
  );
}
