import { useRouter } from "next/router";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const usePageViews = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", GA_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default usePageViews;
