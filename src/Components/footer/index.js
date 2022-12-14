import { Box, Divider, Grid, Typography } from "@mui/material";
import logoDark from "../../../public/images/logo/logoDark.png";
import Image from "next/image";
import { FooterEachGridItem } from "../../styles/footer";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box paddingTop={20} paddingBottom={20} marginTop={20} bgcolor="black">
      <Grid
        container
        spacing={1}
        justifyContent="space-evenly"
        sx={{
          padding: "8px",
        }}
      >
        <FooterEachGridItem item xs={12} sm={12} md={3} lg={3}>
          <Box>
            <Image src={logoDark} width={179} height={34} alt="logo" />
          </Box>
          <Typography color="white" paddingTop={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit amet,
            consectetur adipiscing
          </Typography>
        </FooterEachGridItem>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white" }}
        />
        <FooterEachGridItem
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          marginTop={{ xs: 5, sm: 5, md: 0, lg: 0 }}
        >
          <Typography color="white" variant="h5">
            Store Information
          </Typography>
          <Typography color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit amet,
            consectetur adipiscing
          </Typography>
        </FooterEachGridItem>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white" }}
        />
        <FooterEachGridItem
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          marginTop={{ xs: 5, sm: 5, md: 0, lg: 0 }}
        >
          <Typography color="white" variant="h5">
            Connect With Us
          </Typography>
          <Box
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FacebookIcon sx={{ margin: "5px" }} />
            <TwitterIcon sx={{ margin: "5px" }} />
            <InstagramIcon sx={{ margin: "5px" }} />
          </Box>
        </FooterEachGridItem>
      </Grid>
    </Box>
  );
}
