import { useState } from "react";
import Header from "../components/Header";
import { parseCookies } from "nookies";
import TextEditor from "../components/TextEditor";
import styles from "../styles/CreatePost.module.scss";

export default function CreatePost(){

    return (
        <>
            <Header />
            <main className={styles.main}>
                <TextEditor />
            </main>
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
  
    return {
        props: {}
    };
  };
  