import Header from "../../components/Header";
import { parseCookies } from "nookies";
import {getPostBySlug} from "../../services/post";
import EditPostEditor from "../../components/EditPostEditor";
import Head from "next/head";
import styles from "../../styles/CreatePost.module.scss";

export default function EditPost({post, token}) {
  return (
    <>
      <Head>
        <title>Edit - {post.title}</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <EditPostEditor post={post} token={token}/>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {

  const slug = ctx.params.slug;
  const { ["devclone.token"]: token } = parseCookies(ctx);
  const post = await getPostBySlug(slug);

  return {
    props: {
      post,
      token,
    },
  };
}