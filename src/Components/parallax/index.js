import { Box, Typography } from "@mui/material";
import parallaxImage from "../../../public/images/parallax/20.jpg";

export default function Parallax() {
  return (
    <Box
      paddingTop={20}
      paddingBottom={20}
      sx={{
        backgroundImage: `url(${parallaxImage.src})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: `rgba(0,0,0,0.6)`,
        backgroundBlendMode: "overlay",
      }}
    >
      <Typography align="center" variant="h1" color={"red"} fontWeight="500">
        2022
      </Typography>
      <Typography align="center" variant="h1" color={"white"} fontWeight="500">
        PS5 GAMES
      </Typography>
      <Typography
        align="center"
        variant="h3"
        color={"white"}
        fontWeight="300"
        paddingTop={5}
      >
        SPECIAL OFFER
      </Typography>
    </Box>
  );
}
