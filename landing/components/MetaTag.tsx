import React, { useEffect } from "react";
import Head from "next/head";
import { isDev, MARKETING_ADDR } from "../config";
import { Analytics } from "rc-analytics";
import { Meta } from "../core/meta";
import { parse } from "querystring";
import { Utm } from "../core/utm";

export interface MetaTagProps {
  data: Meta;
}
export function MetaTag({ data }: MetaTagProps): React.ReactElement {
  useEffect(() => {
    if (process.browser) {
      if (document !== undefined) {
        const domain = isDev ? "juicier.finance" : "localhost";
        // Analytics.init(MARKETING_ADDR, domain).then(async () => {
        //   const queryString = document.location.search;
        //   const query =
        //     queryString[0] === "?" ? queryString.substr(1) : queryString;
        //   const values = (parse(query) as unknown) as Record<string, string>;
        //   const utms: string[] = [
        //     "utm_source",
        //     "utm_medium",
        //     "utm_campaign",
        //     "utm_content",
        //   ];
        //   const found = utms.filter((u) => values.hasOwnProperty(u)).length;
        //   if (found > 0) {
        //     console.log("UTM FOUNDS!");
        //     const utm: Utm = {
        //       source: values["utm_source"] || "",
        //       medium: values["utm_medium"] || "",
        //       campaign: values["utm_campaign"] || "",
        //       content: values["utm_content"] || "",
        //     };
        //
        //     await Analytics.sendUtm(utm);
        //   }
        //
        //   // Send page event
        //   await Analytics.sendEvent(
        //     "PAGE_OPEN",
        //     `LANDING: ${document.location.pathname}`
        //   );
        // });
      }
    }
  }, [process.browser]);

  const defaultMetaImg =
    "";

  return (
    <Head>
      <title>{data.title}</title>
      <meta property="og:title" content={data.title} />
      <meta property="twitter:title" content={data.title} />
      <meta name="description" content={data.metaDescription} />
      <meta property="og:description" content={data.metaDescription} />
      <meta property="og:url" content={`https://juicer.finance${data.url}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={data.metaImageUrl || defaultMetaImg} />
      <meta
        property="twitter:image"
        content={data.metaImageUrl || defaultMetaImg}
      />
    </Head>
  );
}
