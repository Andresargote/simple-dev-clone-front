import Skeleton from "react-loading-skeleton";
import styles from "../styles/Post.module.scss";

export default function SkeletonComponent() {
  return Array(8)
    .fill()
    .map((item, index) => {
      return (
        <article className={styles.article} key={index}>
          <div className={styles.articleUser}>
              <Skeleton circle={true} height={40} width={40} style={{marginRight: "10px"}}/>
            <div>
              <span>
                <Skeleton width={90} />
              </span>
              <time>
                <Skeleton width={90} />
              </time>
            </div>
          </div>
          <h2>
            <Skeleton count={2} />
          </h2>
        </article>
      );
    });
}
