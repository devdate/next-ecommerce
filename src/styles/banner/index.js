import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BannerContainer = styled(Box)(() => ({
  display: "flex",
  marginTop: 4,
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 8px",
  height: "380px",
}));

export const BannerContainerPromotion = styled(Box)(() => ({
  display: "flex",
  marginTop: 4,
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 12px",
}));

export const PromoBannerEach = styled(Box)((theme) => ({
  padding: "10px",
  flexGrow: 1,
  position: "relative",
}));

export default BannerContainer;
