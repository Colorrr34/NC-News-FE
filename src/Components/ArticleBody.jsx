import { useParams, Link } from "react-router";
import fetchArticle from "../fetch/fetchArticle";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";
import ArticleComments from "./ArticleComponents/ArticleComments";
import CreateComment from "./ArticleComponents/CreateComment";
import { upvoteArticle, downvoteArticle } from "../fetch/voteArticles";

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

  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [newComment, setNewComment] = useState({});

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
    });
  }, []);

  return (
    <div className="article">
      <Nav topic={article.topic} />
      <section className="article-section">
        <h2>{article.title}</h2>
        <p>
          Author: {article.author} | Created at: {article.createdAt}
        </p>
        <img src={article.imageUrl} alt="article-image" />
        <p>{article.body}</p>
      </section>
      <ul id="list-under-article">
        <span id="under-article-1">
          <li>
            <Link to="comments">Read comments:({article.commentCount})</Link>
          </li>
          <li>
            <label htmlFor="create-comment" />
            <button
              id="create-comment"
              onClick={() => {
                setIsCreatingComment(true);
              }}
            >
              create a comment
            </button>
          </li>
        </span>

        <span id="under-article-2">
          <li>
            <label htmlFor="article-upvote">
              <button
                id="article-upvote"
                onClick={() => {
                  upvoteArticle(article.articleId);
                  setVotes(article.votes + 1);
                }}
              >
                upvote
              </button>
            </label>
          </li>
          <li>
            <label htmlFor="article-downvote">
              <button
                id="article-downvote"
                onClick={() => {
                  downvoteArticle(article.articleId);
                  setVotes(article.votes - 1);
                }}
              >
                downvote
              </button>
            </label>
          </li>
          <li id="article-votes">votes: {article.votes}</li>
        </span>
      </ul>
      {isCreatingComment ? (
        <CreateComment user={user} setNewComment={setNewComment} />
      ) : null}
      <ArticleComments newComment={newComment} />
    </div>
  );
}
