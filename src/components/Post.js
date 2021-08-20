import { useState, useEffect } from "react";
import { getPosts } from "../services/post";
import Link from "next/link";
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
                  <Link href={`/${post.creator}`}>
                    <a>
                      <span>{post.creator}</span>
                    </a>
                  </Link>
                  <time dateTime={post.date}>{useFormatDate(post.date)}</time>
                </div>
              </div>
              <h2><Link href={`/article/${post.slug}`}><a>{post.title}</a></Link></h2>
            </article>
          );
        })
      )}
    </>
  );
}
