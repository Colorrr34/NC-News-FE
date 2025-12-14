import { Link } from "react-router";
import { useSearchParams } from "react-router";

export default function ArticlesPageList(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { pages } = props;
  const sortBy = searchParams.get("sort_by");
  const order = searchParams.get("order");
  const topic = searchParams.get("topic");

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
              to={`?${topic ? `topic=${topic}` : ""}${
                sortBy ? `&sort_by=${sortBy}` : ""
              }${order ? `&order=${order}` : ""}&p=${page}`}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
