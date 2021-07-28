import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import SkeletonDashboard from "../components/SkeletonDashboard";
import { getUser } from "../services/users";
import { getPostByUsername } from "../services/post";
import { AuthContext } from "../context/AuthContext";

import styles from "../styles/Dashboard.module.scss";

export default function Dashboard({ data }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.username === data.username) {
      setLoading(true);
      getPostByUsername(data.username)
        .then((posts) => {
          setPosts(posts);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
    return;
  }, [user]);

  return (
    <>
      <Head>
        <title>{data.username} - DEVclone Community</title>
      </Head>
      <Header />
      <main className={styles.dashboardMain}>
        <div className={styles.dashboardUser}>
          <img src="https://github.com/andresargote.png" alt={data.username} />
          <div className={styles.usernameAndEdit}>
            <h2>{data.username}</h2>
            {user?.username === data.username && (
              <a className={styles.editProfile}>Edit profile</a>
            )}
          </div>
          <p>{data.bio ? data.bio : "404 bio not found"}</p>
        </div>

        {user?.username === data.username && <h4>Posts</h4>}

        {loading ? (
          <SkeletonDashboard />
        ) : (
          posts.map((post) => {
            return (
              <article className={styles.article} key={post.id}>
                <h2>{post.title}</h2>
                <div className={styles.articlesButtons}>
                  <button className={styles.delete}>Delete</button>
                  <button>Edit</button>
                </div>
              </article>
            );
          })
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = ctx.params.dashboard;

  const data = await getUser(user);

  return {
    props: {
      data,
    },
  };
}
