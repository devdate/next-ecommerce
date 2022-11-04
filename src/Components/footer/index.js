import { Box, Divider, Grid, Typography } from "@mui/material";
import footerImg from "../../../images/footer/footer.jpg";
import logoDark from "../../../assests/logo/logoDark.png";
import Image from "next/image";

export default function Footer() {
  return (
    <Box
      paddingTop={20}
      paddingBottom={20}
      sx={{
        backgroundImage: `url(${footerImg.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgba(0,0,0,0.6)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="space-evenly"
        sx={{
          margin: "20px 4px 10px 4px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          flexGrow={1}
        >
          <Box paddingBottom={5}>
            <Image src={logoDark} width={179} height={34} alt="logo" />
          </Box>
          <Typography color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit amet,
            consectetur adipiscing
          </Typography>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "white" }}
        />
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          flexGrow={1}
          justifyContent="space-between"
        >
          <Typography color="white" variant="h5">
            Store Information
          </Typography>
          <Typography color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et.Lorem ipsum dolor sit amet,
            consectetur adipiscing
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
