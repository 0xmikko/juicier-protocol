import React from "react";
import axios from "axios";
import {Footer} from "../components/Footer/Footer";
import {PageNotFound} from "../components/404";
import AppBar from "../components/AppBar/AppBar";
import {MetaTag} from "../components/MetaTag";
import {HeroBlock} from "../components/Hero/HeroBlock";
import {Reserve} from "../core/Reserve";
import {Meta} from "../core/meta";
import {ReserveListWidget} from "../containers/Reserves/ReservesListWidget";
import {SERVER_ADDR} from "../config";

const { abi }  = require("../../build/contracts/AaveProvider.json");

interface IndexPageProps {
  meta: Meta | null;
  reserves: Array<Reserve>;
}

export default function IndexPage({meta, reserves}: IndexPageProps) {

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

  const {data} = await axios.get(`${SERVER_ADDR}/api/reserves`);

  console.log(data)
  return {
    props: {meta, reserves: data},
  };
}
