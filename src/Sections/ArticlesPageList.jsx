import { Link } from "react-router";
import { useSearchParams, useLocation } from "react-router";

export default function ArticlesPageList(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pages } = props;
  const location = useLocation();
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");

  return (
    <ul className="page-list">
      {pages.map((page) => {
        if (page === Number(searchParams.get("p"))) {
          return <li key="current-page">{page}</li>;
        }
        return (
          <li key={`main-page-${page}`}>
            <Link
              relative="path"
              to={`?p=${page}${sortBy ? `&sort_by=${sortBy}` : ""}${
                order ? `&order=${order}` : ""
              }`}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
