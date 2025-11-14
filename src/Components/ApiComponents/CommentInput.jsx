import { useUsername } from "../../Provider/UsernameProvider";

export default function CommentInput(props) {
  const { username } = useUsername();
  const { showSubmitMessage } = props;

  return (
    <>
      <label htmlFor="comment-input" />
      <textarea
        id="comment-input"
        type="text"
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
