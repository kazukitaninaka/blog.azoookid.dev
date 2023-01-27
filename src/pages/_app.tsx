import Layout from "../components/common/Layout";
import NextNprogress from "nextjs-progressbar";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
    
          gtag('config', '${GA_ID}');
        `}
      </Script>
      <Layout>
        <NextNprogress />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
