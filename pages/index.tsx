import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import styles from '../styles/Home.module.css'
import { AirtableData } from './api/hello'

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


  console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {data?.map(item => {
        return <Card key={item.headline}></Card>
      })}

     
    </div>
  )
}

export default Home
