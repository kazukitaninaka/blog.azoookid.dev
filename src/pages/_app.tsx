import Layout from "../components/common/Layout";
import NextNprogress from "nextjs-progressbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextNprogress />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
