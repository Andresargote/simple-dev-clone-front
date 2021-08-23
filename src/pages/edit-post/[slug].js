import Header from "../../components/Header";
import { parseCookies } from "nookies";
import { getPostBySlug } from "../../services/post";
import EditPostEditor from "../../components/EditPostEditor";
import Head from "next/head";
import styles from "../../styles/CreatePost.module.scss";
import Error from "../../components/Error";

export default function EditPost({ errorCode, post, token }) {
  return (
    <>
      <Head>
        <title>{post?.title ? `Edit - ${post.title}` : "Error"}</title>
      </Head>
      {errorCode ? (
        <Error error={errorCode} />
      ) : (
        <>
          <Header />
          <main className={styles.main}>
            <EditPostEditor post={post} token={token} />
          </main>
        </>
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { ["devclone.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const slug = ctx.params.slug;
  const post = await getPostBySlug(slug);
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
    props: {
      post,
      token,
    },
  };
}
