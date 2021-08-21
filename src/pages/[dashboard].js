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
import Error from "../components/Error";

export default function Dashboard({ errorCode, data }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.username) {
      setLoading(true);
      getPostByUsername(data?.username)
        .then((posts) => {
          setPosts(posts.reverse());
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    return;
  }, [user]);

  return (
    <>
      {errorCode ? (
        <Error error={errorCode} />
      ) : (
        <>
          <Head>
            <title>{data.username} - DEVclone Community</title>
          </Head>
          <Header />
          <main className={styles.dashboardMain}>
            <div className={styles.dashboardUser}>
              <img
                src={data?.imgUrl ? data.imgUrl : "https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png"}
                alt={data.username}
              />
              <div className={styles.usernameAndEdit}>
                <h2>{data.username}</h2>
                {user?.username === data.username && (
                  <Link href={`/edit-profile/${data.username}`}>
                    <a className={styles.editProfile}>Edit profile</a>
                  </Link>
                )}
              </div>
              <p>{data.bio ? data.bio : "404 bio not found"}</p>

              <div className={styles.extraInformation}>
                {data.location && <span>📍 {data.location}</span>}
                {data.websiteUrl && (
                  <span>
                    <a
                      href={`${data.websiteUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      🔗 Website
                    </a>
                  </span>
                )}
              </div>
            </div>

            <h4>Posts</h4>

            {loading ? (
              <SkeletonDashboard />
            ) : (
              posts.map(({ id, title, content, slug }) => {
                return (
                  <article className={styles.article} key={id}>
                    <h2>
                      <Link href={`/article/${slug}`}>
                        <a>{title}</a>
                      </Link>
                    </h2>
                      {user?.username === data.username && (
                        <div className={styles.articlesButtons}>
                          <button
                            className={styles.delete}
                          >
                            <Link href={`/delete/${slug}`}>
                              <a>Delete</a>
                            </Link>
                          </button>

                          <button>
                            <Link href={`/edit-post/${slug}`}>
                              <a>Edit</a>
                            </Link>
                          </button>
                        </div>
                      )}
                  </article>
                );
              })
            )}
          </main>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = ctx.params.dashboard;
  const data = await getUser(user);
  const { res } = ctx;

  const errorCode = data.ok ? false : data.error?.response.status;

  if (errorCode) {
    res.statusCode = errorCode;
    return {
      props: {
        errorCode,
      },
    };
  } else {
    return {
      props: {
        data,
      },
    };
  }
}
