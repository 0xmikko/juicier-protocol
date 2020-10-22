import React, {useEffect} from "react";
import {AppProps} from "next/app";
import {useRouter} from "next/router";
import {GoogleAnalytics} from "rc-analytics";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/app.css";
import "../styles/fonts.css";
import {GA_TRACKING_ID} from "../config";


function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      GoogleAnalytics.pageview(GA_TRACKING_ID, url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}

export default MyApp;
