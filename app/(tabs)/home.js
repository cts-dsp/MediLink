import React from "react";
import ClimateSolutions from "../../components/App/ClimateSolutions";
import Insights from "../../components/App/Insights";
import MinimalLayout from "../../components/Layout/MinimalLayout";

const Home = () => {

  return (
    <MinimalLayout showHeader>
      <Insights />
      <ClimateSolutions />
    </MinimalLayout>
  );
};

export default Home;
