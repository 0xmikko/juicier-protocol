import React, { useEffect } from "react";
import { Footer } from "../components/Footer/Footer";
import { PageNotFound } from "../components/404";
import AppBar from "../components/AppBar/AppBar";
import { MetaTag } from "../components/MetaTag";
import { Meta } from "../core/meta";

interface LandingProps {
  meta: Meta | null;
}

export default function IndexPage({ meta }: LandingProps) {
  if (meta === null) {
    return <PageNotFound />;
  }

  return (
    <>
      <MetaTag data={meta} />
      <AppBar />
      <Footer />
    </>
  );
}

export async function getStaticProps(): Promise<{ props: LandingProps }> {

  const meta: Meta = {
    metaDescription:
      "Juicier Protocol is lending broker which provides better returns on your assets.",
    metaKeywords: "DeFi, Landing",
    title: "Get more from your assets | Juicier Protocol",
    url: "/",

   
  };

  return {
    props: { meta },
  };
}
