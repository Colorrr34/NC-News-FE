import { useState } from "react";
import { Link } from "react-router";

export default function PageList(props) {
  const { pages, currentPage, topic } = props;
  return (
    <ul className="page-list">
      {pages.map((page) => {
        if (page === currentPage) {
          return <li key="current-page">{page}</li>;
        }
        return (
          <li key={`main-page-${page}`}>
            <Link
              relative="path"
              to={`?${topic === "all" ? "" : `topic=${topic}&`}p=${page}`}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
