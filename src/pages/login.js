import Header from "../components/Header";
import { parseCookies } from "nookies";
import LoginComponent from "../components/LoginComponent";

export default function Login() {
  return (
    <>
      <Header />
      <LoginComponent />
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
      props: {}
  };
};
