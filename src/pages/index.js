import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.scss";
import Post from "../components/Post";

export default function Home() {

  return (
    <>
      <Head>
        <title>DEVclone Community</title>
      </Head>
      <Header />
      <main className={styles.main}>
        <Post />
      </main>
    </>
  );
}
