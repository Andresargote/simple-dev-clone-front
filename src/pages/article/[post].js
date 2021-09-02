import Head from "next/head";
import Link from "next/link";
import Error from "../../components/Error";
import Header from "../../components/Header";
import useFormatDate from "../../hooks/useFormatDate";
import { getPostBySlug } from "../../services/post";
import { getUser } from "../../services/users";
import styles from "../../styles/Article.module.scss";

export default function Post({ errorCode, post, user }) {

  const formatDate = useFormatDate(post?.date);

  return (
    <>
    <Head>
      <title>{post?.title ? post.title : "Error"}</title>
    </Head>
      {errorCode ? (
        <Error error={errorCode}/>
      ) : (
        <>
          <Header />
          <main className={styles.postContainer}>
            <h1>{post.title}</h1>
            <div className={styles.postInfo}>
              <span>
                <Link href={`/${user.username}`}>
                  <a>{user.username}</a>
                </Link>{" "}
                - {formatDate}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </main>
        </>
      )}
    </>
  );
}

export async function getServerSideProps({ params, res }) {
  const post = await getPostBySlug(params.post);
  const errorCode = post.ok ? false : post.error?.response?.status;

  if (errorCode) {
    res.statusCode = errorCode;
    return {
      props: {
        errorCode,
      },
    };
  } else {
    const user = await getUser(post.creator);
    return {
      props: {
        post,
        user,
      },
    };
  }
}
