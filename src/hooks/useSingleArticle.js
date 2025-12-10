import { useState, useEffect } from "react";
import { getArticle } from "../api";
import { useParams } from "react-router";

export default function useSingleArticle() {
  const { id: articleId } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticle(articleId)
      .then(({ data: { article } }) => {
        const { created_at, ...otherProperties } = article;

        const date = new Date(created_at);

        setArticle({ createdAt: date.toDateString(), ...otherProperties });
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          status: err.status,
          msg: err.response.data.msg,
        });
      });
  }, []);

  return { article, isLoading, error, setError };
}
