import { getArticles } from "../api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export default function useArticlesData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [pages, setPages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentPage = Number(searchParams.get("p")) || 1;
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";
    const topic = searchParams.get("topic") || "all";

    setIsLoading(true);
    getArticles(sortBy, order, currentPage, topic)
      .then(({ data }) => {
        const totalPages = Math.ceil(data.total_count / 10);
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        setPages(pages);
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          status: err.status,
          msg: err.response.data.msg,
        });
      });
  }, [searchParams]);

  return {
    isLoading,
    articles,
    pages,
    error,
    setError,
  };
}
