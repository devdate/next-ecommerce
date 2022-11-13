import { Container } from "@mui/system";
import Head from "next/head";
import Banner from "../src/Components/banner";
import PromotionBanner from "../src/Components/PromotionBanner";
import styles from "../styles/Home.module.css";
import Products from "../src/Components/products";
import Parallax from "../src/Components/parallax";
import axios from "axios";

export default function Home({ productsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gamerskart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="xl" disableGutters>
        <Banner />
        <PromotionBanner />
        <Products productsData={productsData} />
        <Parallax />
      </Container>
    </div>
  );
}
export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productsData: res.data,
    },
  };
};
