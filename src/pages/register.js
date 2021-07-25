import CreateAccount from "../components/CreateAccount";
import { parseCookies } from "nookies";
import Header from "../components/Header";

export default function Register() {
  return (
    <>
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
