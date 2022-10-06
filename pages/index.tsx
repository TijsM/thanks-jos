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

      setData(data);
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
  background-color: #ffffff;
  min-height: 100vh;
  margin: 24px;
  
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
`;
