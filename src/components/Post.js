import { useState, useEffect } from "react";
import { getPosts } from "../services/post";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Post.module.scss";
import SkeletonComponent from "./SkeletonComponent";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const formateDate = (dateString) => {
    const date = new Date(dateString);
    const formatDate = new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);

    return formatDate;
  };

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((data) => {
        const format = data
          .map((data) => {
            return {
              ...data,
              date: formateDate(data.date),
            };
          })
          .reverse();
        setPosts(format);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const router = useRouter();
  const handlerChangeURL = (url) => router.push(url);
  return (
    <>
      {loading ? (
        <SkeletonComponent />
      ) : (
        posts.map((post) => {
          return (
            <article
              className={styles.article}
              key={post.id}
              onClick={() => handlerChangeURL(`/article/${post.slug}`)}
            >
              <div className={styles.articleUser}>
                <Image src={post.userImg} width={200} height={200} alt={post.creator} />
                <div>
                  <a>
                    <span>{post.creator}</span>
                  </a>

                  <time dateTime={post.date}>{post.date}</time>
                </div>
              </div>
              <h2>
                <a>{post.title}</a>
              </h2>
            </article>
          );
        })
      )}
    </>
  );
}
