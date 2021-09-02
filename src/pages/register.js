import CreateAccount from "../components/CreateAccount";
import Head from "next/head";
import { parseCookies } from "nookies";
import Header from "../components/Header";

export default function Register() {
  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <Header />
      <CreateAccount />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ["devclone.token"]: token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
