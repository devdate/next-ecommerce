import { Container } from "@mui/system";
import Head from "next/head";
import Banner from "../src/Components/banner";
import PromotionBanner from "../src/Components/PromotionBanner";
import styles from "../styles/Home.module.css";
import Products from "../src/Components/products";
import Parallax from "../src/Components/parallax";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gamerskart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" disableGutters>
        <Banner />
        <PromotionBanner />
        <Products />
        <Parallax />
      </Container>
    </div>
  );
}
