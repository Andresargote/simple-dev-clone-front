import Skeleton from "react-loading-skeleton";
import styles from "../styles/Dashboard.module.scss";

export default function SkeletonDashboard() {
  return Array(5)
    .fill()
    .map((item, index) => {
      return (
        <article className={styles.article} key={index}>
          <h2>
            <Skeleton count={2} />
          </h2>
          <div className={styles.articlesButtons}>
            <Skeleton width={50} height={28} style={{marginRight: "10px"}}/>
            <Skeleton  width={50} height={28}/>
          </div>
        </article>
      );
    });
}
