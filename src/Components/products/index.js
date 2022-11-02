import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";
import Image from "next/image";
import { ProductsData } from "../../data";
import SingleProduct from "./SingleProduct";

export default function Products() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const renderProducts = ProductsData.map((product) => (
    <Grid
      item
      xs={12}
      md={6}
      lg={4}
      key={product.id}
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      flexGrow={1}
    >
      <SingleProduct product={product} matches={matches} />
    </Grid>
  ));

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ backgroundColor: "primary.main" }}>
        <Typography
          paddingTop={10}
          paddingBottom={5}
          variant="h3"
          align="center"
          color={"white"}
        >
          Featured Games
        </Typography>
      </Box>

      <Grid
        container
        spacing={1}
        justifyContent="center"
        sx={{
          margin: "20px 4px 10px 4px",
        }}
      >
        {renderProducts}
      </Grid>
    </Box>
  );
}
