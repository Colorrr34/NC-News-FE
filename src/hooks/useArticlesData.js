import { getArticles } from "../api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export default function useArticlesData() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [pages, setPages] = useState([]);
  const [topic, setTopic] = useState("all");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("p")) || 1);
    setSortBy(searchParams.get("sort_by") || "created_at");
    setOrder(searchParams.get("order") || "desc");
    setTopic(searchParams.get("topic") || "all");
  }, [searchParams]);

  useEffect(() => {
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
        console.log(err);
      });
  }, [sortBy, order, currentPage, topic]);

  return {
    setSortBy,
    setOrder,
    isLoading,
    articles,
    pages,
    currentPage,
    topic,
  };
}
