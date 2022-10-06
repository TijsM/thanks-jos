import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Card } from "../components/Card";
import { AirtableData } from "./api/hello";

const Home: NextPage = () => {
  const [data, setData] = useState<AirtableData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/hello");
      const data = await res.json();

      setData(data)
    };

    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>Thank you Jos!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StCardsContainer>
        {data?.map((item) => {
          return <Card key={item.headline} data={item} />;
        })}
      </StCardsContainer>
    </div>
  );
};

export default Home;

const StCardsContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  min-height: 100vh;
  column-count: 5;
  margin-bottom: 200px;

  @media (max-width: 2300px) {
    column-count: 4;
  }
  @media (max-width: 1850px) {
    column-count: 3;
  }
  @media (max-width: 1400px) {
    column-count: 2;
  }
  @media (max-width: 950px) {
    column-count: 1;
  }
`;
