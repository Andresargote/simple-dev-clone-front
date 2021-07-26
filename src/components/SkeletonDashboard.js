import Skeleton from "react-loading-skeleton";
import styles from "../styles/Post.module.scss";

export default function SkeletonDashboard() {
  return Array(5)
    .fill()
    .map((item, index) => {
      return (
        <article className={styles.article} key={index}>
          <h2>
            <Skeleton count={2} />
          </h2>
        </article>
      );
    });
}
