import { useParams, Link } from "react-router";
import fetchArticle from "../fetch/fetchArticle";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";

export default function ArticleBody() {
  const { id: articleId } = useParams();

  // article states
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [body, setBody] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [createdAt, setCreatedAt] = useState("");

  //comments states
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchArticle(articleId).then(({ data }) => {
      const {
        title,
        topic,
        author,
        body,
        article_img_url,
        created_at,
        comment_count,
      } = data;

      setTitle(title);
      setTopic(topic);
      setAuthor(author);
      setImageUrl(article_img_url);
      setBody(body);
      setCommentCount(comment_count);
      const date = new Date(created_at);
      setCreatedAt(date.toDateString());
    });

    fetchArticle(articleId, true, 3).then(({ data: { comments } }) => {
      const commentsArray = comments.map((comment) => {
        const { created_at, ...otherProperties } = comment;
        const date = new Date(created_at);
        const time = `${
          date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
        }:${
          date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
        } ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        return { created_at: time, ...otherProperties };
      });

      setComments(commentsArray);
    });
  }, []);

  return (
    <div className="article">
      <Nav topic={topic} />
      <section className="article-section">
        <h2>{title}</h2>
        <p>
          Author: {author} | Created at: {createdAt}
        </p>
        <img src={imageUrl} alt="article-image" />
        <p>{body}</p>
      </section>
      <Link to="comments">
        <p>Read comments:({commentCount})</p>
      </Link>
      {comments.map((comment) => {
        return (
          <section key={comment.comment_id} className="comment-section">
            <p className="username">author: {comment.author}</p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-info">
              votes: {comment.votes} | {comment.created_at}
            </p>
          </section>
        );
      })}
    </div>
  );
}
