import React, {useEffect} from "react";
import axios from "axios";
import {Footer} from "../../components/Footer/Footer";
import {PageNotFound} from "../../components/404";
import AppBar from "../../components/AppBar/AppBar";
import {MetaTag} from "../../components/MetaTag";
import {HeroBlock} from "../../components/Hero/HeroBlock";
import {Reserve} from "../../core/Reserve";
import {Meta} from "../../core/meta";
import {ReserveListWidget} from "../../containers/Reserves/ReservesListWidget";

interface IndexPageProps {
  meta: Meta | null;
  reserves: Array<Reserve>;
}

export default function DepositPage({meta, reserves}: IndexPageProps) {
  if (meta === null) {
    return <PageNotFound />;
  }

  return (
    <>
      <MetaTag data={meta} />
      <AppBar backgroundColor={"rgb(0, 157, 128)"} />
      <HeroBlock />
      <ReserveListWidget data={reserves} />
      <Footer />
    </>
  );
}

export async function getServerSideProps(): Promise<{props: IndexPageProps}> {
  const meta: Meta = {
    metaDescription:
      "Juicier Protocol is lending broker which provides better returns on your assets.",
    metaKeywords: "DeFi, Landing",
    title: "Get more from your assets | Juicier Protocol",
    url: "/",
  };

  const {data} = await axios.get("http://localhost:3000/api/reserves");

  return {
    props: {meta, reserves: data},
  };
}
