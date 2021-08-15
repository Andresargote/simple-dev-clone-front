import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Head from "next/head";
import Header from "../components/Header";
import SkeletonDashboard from "../components/SkeletonDashboard";
import { getUser } from "../services/users";
import { getPostByUsername } from "../services/post";
import { AuthContext } from "../context/AuthContext";

import styles from "../styles/Dashboard.module.scss";
import Link from "next/link";
import Modal from "../components/Modal";

export default function Dashboard({ data, token }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState({}); 

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

  const handleDeletePost = (id, title) => {
    setModal(true);
    setPostToDelete({
      id,
      title
    });
  };

  return (
    <>
      <Head>
        <title>{data.username} - DEVclone Community</title>
      </Head>
      <Header />
      <main className={styles.dashboardMain}>
        {modal && <Modal token={token} user={user} post={postToDelete} setPost={setPostToDelete} setModal={setModal}/>}
        <div className={styles.dashboardUser}>
          <img src="https://github.com/andresargote.png" alt={data.username} />
          <div className={styles.usernameAndEdit}>
            <h2>{data.username}</h2>
            {user?.username === data.username && (
              <Link href="/edit-profile">
                <a className={styles.editProfile}>Edit profile</a>
              </Link>
            )}
          </div>
          <p>{data.bio ? data.bio : "404 bio not found"}</p>
        </div>

        {user?.username === data.username && <h4>Posts</h4>}

        {loading ? (
          <SkeletonDashboard />
        ) : (
          posts.map(({ id, title }) => {
            return (
              <article className={styles.article} key={id}>
                <h2>{title}</h2>
                <div className={styles.articlesButtons}>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeletePost(id, title)}
                  >
                    Delete
                  </button>
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
  const { ["devclone.token"]: token } = parseCookies(ctx);

  const data = await getUser(user);

  return {
    props: {
      data,
      token
    },
  };
}
