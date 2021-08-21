import { useState } from "react";
import { parseCookies } from "nookies";
import { deletePost, getPostBySlug } from "../../services/post";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from "../../components/Header";
import Error from "../../components/Error";
import Head from "next/head";

import styles from "../../styles/Delete.module.scss";
import router from "next/router";

export default function Delete({ token, post, errorCode }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const handleDeletePost = async () => {
    setLoader(true);

    const response = await deletePost(token, post.slug);

    if (response?.error?.response.status === 401) {
      setLoader(false);
      setError("Unauthorized");
    }

    if (response.error?.response.data.error) {
      setLoader(false);
      setError(response.error.response.data.error);
    }



    setLoader(false);
    router.push(`/${post.creator}`)
  };

  return (
    <>
      <Head>
        <title>{post?.title ? `Delete - ${post?.title}` : "Error"}</title>
      </Head>
      {errorCode ? (
        <Error error={errorCode} />
      ) : (
        <>
          <Header />
          <main className={styles.delete}>
            <h4>Are you sure you want to delete this article?</h4>
            {loader && (
              <Loader
                type="ThreeDots"
                height={25}
                color="#d2d6db"
                width={50}
                style={{ margin: "10px auto" }}
              />
            )}
            {error !== "" && <p className="Error">⚠️ {error}</p>}
            <h2>Article: {post.title}</h2>
            <div>
              <button className={styles.red} onClick={handleDeletePost}>
                Delete
              </button>
              <button
                onClick={() => {
                  router.push(`/${post.creator}`)
                }}
              >
                Cancel
              </button>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ["devclone.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const post = await getPostBySlug(ctx.params.slug);
  const errorCode = post.ok ? false : post.error?.response.status;

  if (errorCode) {
    ctx.res.statusCode = errorCode;
    return {
      props: {
        errorCode,
      },
    };
  }

  return {
    props: { token, post },
  };
};
