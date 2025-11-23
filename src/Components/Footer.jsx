import { Link } from "react-router";
import "../stylesheets/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        Please visit my github for more projects that I have built
        <Link to="https://github.com/Colorrr34" id="github-link">
          : GitHub
        </Link>
      </p>
    </footer>
  );
}
