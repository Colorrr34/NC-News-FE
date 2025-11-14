import { useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { getCommentsByArticle, getArticle } from "../api";
import ArticleSummary from "../Sections/ArticleSummary";
import Nav from "./Nav";
import SingleComment from "../Sections/SingleComment";
import "../stylesheets/comments.css";
import CommentsPageList from "../Sections/CommentsPageList";
import CommentInputSection from "../Sections/CommentInputSection";
import { ParentClassContext } from "../Context/ClassContext";

export default function Comments() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id: articleId } = useParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("p") ? Number(searchParams.get("p")) : 1
  );
  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState([]);
  const [deletedComment, setDeletedComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState({});
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    getArticle(articleId).then(({ data }) => {
      setArticle(data);
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("p")) {
      setCurrentPage(Number(searchParams.get("p")));
    }
  }, [searchParams]);

  useEffect(() => {
    setTimeout(
      () => {
        setIsLoading(true);
        getCommentsByArticle(articleId, 10, currentPage).then(({ data }) => {
          const totalPages = Math.ceil(data.total_count / 10);
          const pages = [];
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
          setPages(pages);
          setComments(data.comments);
          setDeletedComment(null);
          setIsLoading(false);
        });
      },
      deletedComment ? 3000 : 0
    );
  }, [currentPage, deletedComment]);

  useEffect(() => {
    if (Object.keys(newComment).length > 0) {
      const copy = structuredClone(comments);
      copy.unshift(newComment);
      copy.pop();
      setComments(copy);
    }
  }, [newComment]);

  return isLoading ? (
    <section className="section-loading">Loading...</section>
  ) : (
    <>
      <Nav topic={article.topic} />
      <main className="comments-body">
        <ArticleSummary article={article} />
        <section className="comments--section-3">
          <p>comments:</p>
          <ParentClassContext value="comments--section-3">
            <CommentInputSection
              isCreatingComment={isCreatingComment}
              setIsCreatingComment={setIsCreatingComment}
              setNewComment={setNewComment}
            />
          </ParentClassContext>
        </section>
        {comments.map((comment) => {
          return comment.comment_id === deletedComment ? (
            <section
              key="deleted-comment"
              className="section-deleted-comment-placeholder"
            >
              <p>Comment deleted</p>
            </section>
          ) : (
            <SingleComment
              comment={comment}
              setDeletedComment={setDeletedComment}
              key={`comment-${comment.comment_id}`}
            />
          );
        })}
        <CommentsPageList pages={pages} currentPage={currentPage} />
      </main>
    </>
  );
}
