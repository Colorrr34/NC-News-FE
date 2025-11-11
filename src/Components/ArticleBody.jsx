import { useParams, Link } from "react-router";
import fetchArticle from "../fetch/fetchArticle";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import Comments from "./ArticleComponents/Comments";

export default function ArticleBody() {
  const { id: articleId } = useParams();

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [body, setBody] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  const [createdAt, setCreatedAt] = useState("");

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
      <Comments articleId={articleId} />
    </div>
  );
}
