import { useState, useEffect } from "react";
import { getPosts } from "../services/post";
import useFormatDate from "../hooks/useFormatDate";
import styles from "../styles/Post.module.scss";
import SkeletonComponent from "./SkeletonComponent";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((data) => {
        setPosts(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        posts.map((post) => {
          return (
            <article className={styles.article} key={post.id}>
              <div className={styles.articleUser}>
                <img
                  src="https://github.com/andresargote.png"
                  alt={post.username}
                />
                <div>
                  <span>{post.creator}</span>
                  <time dateTime={post.date}>{useFormatDate(post.date)}</time>
                </div>
              </div>
              <h2>{post.title}</h2>
            </article>
          );
        })
      )}
    </>
  );
}

/* {
  loading ? (
    <h1>Cargando..</h1>
  ) : (
  posts.map((post) => {
      return (
        <article className={styles.article} key={post.id}>
          <div className={styles.articleUser}>
            <img src="https://github.com/andresargote.png" alt={post.username} />
            <div>
                <span>{post.creator}</span>
                <time dateTime={post.date}>{useFormatDate(post.date)}</time>
            </div>
          </div>
          <h2>{post.title}</h2>
        </article>
      );
    });
  )
}
 */
