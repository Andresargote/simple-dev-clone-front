import Header from "../components/Header";
import { parseCookies } from "nookies";
import TextEditor from "../components/TextEditor";
import styles from "../styles/CreatePost.module.scss";

export default function CreatePost({token}){

    return (
        <>
            <Header />
            <main className={styles.main}>
                <TextEditor token={token}/>
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
        props: {token}
    };
  };
  