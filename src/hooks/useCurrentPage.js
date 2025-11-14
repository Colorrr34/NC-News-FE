import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";

export default function useCurrentPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    searchParams.get("p") ? Number(searchParams.get("p")) : 1
  );
  useEffect(() => {
    if (searchParams.get("p")) {
      setCurrentPage(Number(searchParams.get("p")));
    }
  }, [searchParams]);

  return currentPage;
}
