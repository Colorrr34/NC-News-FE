import { useState } from "react";
import { useParams } from "react-router";
import { postComment } from "../../fetch/post";
import { UserContext } from "../../Context/Context";
import { useContext } from "react";

export default function CreateComment(props) {
  const { id: articleId } = useParams();
  const { setNewComment } = props;
  const [inputText, setInputText] = useState("");
  const [ShowSubmitMessage, setShowSubmitMessage] = useState(false);

  const { user } = useContext(UserContext);

  function submitComment(text) {
    postComment(text, user, articleId).then(({ data }) => {
      setNewComment(data);
    });
  }

  return (
    <form>
      <label htmlFor="comment-input">
        <textarea
          id="comment-input"
          type="text"
          placeholder={`Commenting as ${user}`}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></textarea>
      </label>
      <label htmlFor="submit-comment" />
      <button
        id="submit-comment"
        type="submit"
        onSubmit={(e) => {
          e.preventDefault();
          submitComment(inputText, user, articleId);
          setShowSubmitMessage(true);
        }}
      >
        Submit
      </button>
      {ShowSubmitMessage ? <p>comment submitted!</p> : null}
    </form>
  );
}
