import { Button } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import Appbar from "../src/Components/appbar";
import Banner from "../src/Components/banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        maxWidth="xl"
        disableGutters
        sx={
          {
            //background: "#fff",
          }
        }
      >
        <Appbar />
        <Banner />
        {/*
          Appbar
          Banner
          Promotions
          title
          products
          footer
          searchbbox
          appdrawer
          */}
      </Container>
    </div>
  );
}
