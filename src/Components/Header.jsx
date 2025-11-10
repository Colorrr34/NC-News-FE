export default function Header(props) {
  const { user } = props;
  return (
    <header>
      <h1>NC News</h1>
      <section className="user-banner">
        <p>{user}</p>
      </section>
    </header>
  );
}
