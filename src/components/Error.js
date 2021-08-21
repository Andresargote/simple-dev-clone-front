import Link from "next/link";
import styles from "../styles/Error.module.scss";

export default function Error({ error }) {
  return (
    <div className={styles.error}>
      <h4>{error}</h4>
      {error === 404 && <p>This page does not exist</p>}
      {error === 500 && <p>Internal server error</p>}
      <Link href="/">
        <a>Return to Home Page</a>
      </Link>
    </div>
  );
}
