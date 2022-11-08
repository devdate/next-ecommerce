import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FooterEachGridItem = styled(Grid)(() => ({
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  flexGrow: 1,
  justifyContent: "space-evenly",
}));
