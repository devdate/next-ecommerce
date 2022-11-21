import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BannerContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 8px",
  height: "100%",
  position: "relative",
}));

export const BannerContainerPromotion = styled(Grid)(() => ({
  display: "flex",
  marginTop: 4,
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 12px",
}));

export const PromoBannerEach = styled(Grid)((theme) => ({
  padding: "10px",
  flexGrow: 1,
  position: "relative",
  height: "200px",
}));

export default BannerContainer;
