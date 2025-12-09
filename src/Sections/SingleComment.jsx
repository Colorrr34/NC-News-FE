import { useEffect, useState } from "react";
import DeleteComment from "../Components/ApiComponents/DeleteComment";
import VoteComment from "../Components/ApiComponents/VoteComment";
import { useUsername } from "../Provider/UsernameProvider";
import "./SingleComment.css";

export default function SingleComment(props) {
  const { comment, setDeletedComment } = props;
  const { username } = useUsername();

  const date = new Date(comment.created_at);
  const createdAt = `${
    date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
  }:${
    date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
  } ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  return (
    <section className="single-comment__section-comment">
      <p className="single-comment-username">author: {comment.author}</p>
      <p className="single-comment-body">{comment.body}</p>
      <section className="single-comment__section-bottom">
        <p className="comment-created-at">{createdAt}</p>
        {username === comment.author ? (
          <DeleteComment
            commentId={comment.comment_id}
            setDeletedComment={setDeletedComment}
          />
        ) : null}
        <VoteComment
          commentId={comment.comment_id}
          commentVotes={comment.votes}
        />
      </section>
    </section>
  );
}
