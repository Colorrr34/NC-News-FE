import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getArticle } from "../api";

export default function useArticleSummary() {
  const { id: articleId } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle(articleId).then(({ data }) => {
      setArticle(data);
    });
  }, []);

  return article;
}
