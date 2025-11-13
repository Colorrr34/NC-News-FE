export default function MainSort(props) {
  const { setOrder, setSortBy } = props;
  return (
    <section className="main--sort-section">
      <label htmlFor="sort-by-selector">sort by: </label>
      <select
        id="sort-by-selector"
        onChange={(e) => {
          setSortBy(e.target.value);
        }}
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
      >
        <option value="desc">descending</option>
        <option value="asc">ascending</option>
      </select>
    </section>
  );
}
