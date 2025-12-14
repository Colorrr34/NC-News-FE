import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export default function SortArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const page = Number(searchParams.get("p") || 1);
    const topic = searchParams.get("topic") || "all";
    const params = {};
    if (sortBy !== "created_at") params.sort_by = sortBy;
    if (order !== "desc") params.order = order;
    if (page !== 1) params.p = page;
    if (topic !== "all") params.topic = topic;
    setSearchParams(params);
  }, [sortBy, order]);

  return (
    <section className="main--sort-section">
      <label htmlFor="sort-by-selector">sort by: </label>
      <select
        id="sort-by-selector"
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
        value={sortBy}
      >
        <option value="created_at">created at</option>
        <option value="votes">votes</option>
        <option value="comment_count">comments count</option>
      </select>
      <label htmlFor="order-selector">order: </label>
      <select
        id="order-selector"
        onChange={(e) => {
          setOrder(e.target.value);
        }}
        value={order}
      >
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
    </section>
  );
}
