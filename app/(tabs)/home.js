import React, { useEffect } from "react";
import ClimateSolutions from "../../components/App/ClimateSolutions";
import Insights from "../../components/App/Insights";
import MinimalLayout from "../../components/Layout/MinimalLayout";
// import { router, useGlobalSearchParams } from "expo-router";

const Home = () => {
  // const { path } = useGlobalSearchParams();

  // useEffect(() => {
  //   if (path === "health") {
  //     setTimeout(() => {
  //       router.push("/health");
  //     }, 500);
  //   }
  // }, []);
  return (
    <MinimalLayout showHeader>
      <Insights />
      <ClimateSolutions />
    </MinimalLayout>
  );
};

export default Home;
