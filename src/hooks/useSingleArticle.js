import { useState, useEffect } from "react";
import { getArticle } from "../api";
import { useParams } from "react-router";

export default function useSingleArticle() {
  const { id: articleId } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(200);
  const [errorMsg, setErrorMsg] = useState("no error");

  useEffect(() => {
    setIsLoading(true);
    getArticle(articleId)
      .then(({ data }) => {
        const { created_at, ...otherProperties } = data;

        const date = new Date(created_at);

        setArticle({ createdAt: date.toDateString(), ...otherProperties });
        setIsLoading(false);
      })
      .catch((err) => {
        setStatus(err.status);
        setErrorMsg(`Status: ${err.status}\n${err.response.data.msg}`);
        setIsLoading(false);
      });
  }, []);

  return { article, isLoading, status, errorMsg };
}
