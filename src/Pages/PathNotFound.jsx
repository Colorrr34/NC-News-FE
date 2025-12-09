import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function PathNotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  return (
    <section>
      <h2>Path Not Found</h2>
      <p>Redirecting to homepage...</p>
    </section>
  );
}
