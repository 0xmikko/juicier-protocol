import React, {useEffect} from "react";
import axios from "axios";
import {Footer} from "../components/Footer/Footer";
import {PageNotFound} from "../components/404";
import AppBar from "../components/AppBar/AppBar";
import {MetaTag} from "../components/MetaTag";
import {HeroBlock} from "../components/Hero/HeroBlock";
import {Reserve} from "../core/Reserve";
import {Meta} from "../core/meta";
import {ReserveListWidget} from "../containers/Reserves/ReservesListWidget";
import {useWeb3React, Web3ReactProvider} from "@web3-react/core";
import {getWeb3} from "../components/Web3/getWeb3";
import {AaveProviderContract} from "../../types/truffle-contracts/AaveProvider";
import {SERVER_ADDR} from "../config";

const { abi }  = require("../../build/contracts/AaveProvider.json");

interface IndexPageProps {
  meta: Meta | null;
  reserves: Array<Reserve>;
}

export default function IndexPage({meta, reserves}: IndexPageProps) {
  const web3React = useWeb3React();
  useEffect(() => {
    if (window !== undefined) {
      const web3 = getWeb3();
      if (web3 === null) {
        alert("No web3 provider was found, please connect Metamsk");
        return;
      }
      web3.eth.getAccounts().then(console.log);
      const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
      console.log(abi);
      const dai = (new web3.eth.Contract(
        abi,
        DAI_ADDRESS
      ) as any) as AaveProviderContract;

      //
    }
  }, [process.browser]);

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
