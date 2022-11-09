import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FooterEachGridItem = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  flexGrow: 1,
  justifyContent: "space-evenly",
}));
