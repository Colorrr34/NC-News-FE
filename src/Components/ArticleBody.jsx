import { useParams } from "react-router";
import fetchArticle from "../fetch/fetchArticle";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import CreateCommentAndVotes from "./Sections/CreateCommentAndVotes";
import "../stylesheets/article.css";
import CommentsInArticle from "./Sections/CommentsInArticle";

export default function ArticleBody(props) {
  const { user } = props;
  const { id: articleId } = useParams();

  const [article, setArticle] = useState({
    topic: "",
    title: "",
    author: "",
    imageUrl: null,
    body: "",
    commentCount: 0,
    createdAt: "",
    votes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    setIsLoading(true);
    fetchArticle(articleId).then(({ data }) => {
      const {
        title,
        topic,
        author,
        body,
        article_img_url,
        created_at,
        comment_count,
        votes,
      } = data;

      const date = new Date(created_at);

      setArticle({
        title: title,
        topic: topic,
        author: author,
        body: body,
        imageUrl: article_img_url,
        createdAt: date.toDateString(),
        commentCount: comment_count,
        votes: votes,
      });
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <section>
      <h3>Loading...</h3>
    </section>
  ) : (
    <>
      <Nav topic={article.topic} />
      <main>
        <article className="article article--section-1">
          <h2>{article.title}</h2>
          <p>
            Author: {article.author} | Created at: {article.createdAt}
          </p>
          <img src={article.imageUrl} alt="article-image" />
          <p>{article.body}</p>
        </article>
        <CreateCommentAndVotes
          article={article}
          user={user}
          setNewComment={setNewComment}
        />
        <CommentsInArticle newComment={newComment} user={user} />
      </main>
    </>
  );
}
