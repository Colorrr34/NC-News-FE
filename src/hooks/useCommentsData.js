import { useParams, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { getCommentsByArticle } from "../api";

export default function useCommentsData() {
  const { id: articleId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [comments, setComments] = useState([]);
  const [pages, setPages] = useState([]);
  const [deletedComment, setDeletedComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("p") ? Number(searchParams.get("p")) : 1
  );

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

  return {
    comments,
    deletedComment,
    setDeletedComment,
    isLoading,
    isCreatingComment,
    setIsCreatingComment,
    setNewComment,
    pages,
    currentPage,
  };
}
