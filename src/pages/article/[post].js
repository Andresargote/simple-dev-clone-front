import Link from "next/link";
import Header from "../../components/Header";
import useFormatDate from "../../hooks/useFormatDate";
import { getPostBySlug } from "../../services/post";
import { getUser } from "../../services/users";
import styles from "../../styles/Article.module.scss";

export default function Post({ post, user }) {
  console.log(user);

  return (
    <>
      <Header />
      <main className={styles.postContainer}>
        <h1>{post.title}</h1>
        <div className={styles.postInfo}>
          <span>
            <Link href={`/${user.username}`}>
              <a>{user.username}</a>
            </Link>{" "}
            - {useFormatDate(post.date)}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const post = await getPostBySlug(ctx.params.post);
  const user = await getUser(post.creator);

  return {
    props: {
      post,
      user,
    },
  };
}
