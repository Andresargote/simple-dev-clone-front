import { ContextAuthWrapper } from "../context/AuthContext";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ContextAuthWrapper>
      <Component {...pageProps} />
    </ContextAuthWrapper>
  );
}

export default MyApp;
