import { colors, InputBase, List, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, display } from "@mui/system";
import { Colors } from "../../theme";

//container
export const AppbarContainer = styled(Box)(() => ({
  display: "flex",
  marginTop: 4,
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 8px",
}));

//header
export const AppbarHeaderImage = styled(Box)(() => ({
  padding: "4px",
  flexGrow: 1,
}));

export const MyList = styled(List)(({ type }) => ({
  display: type === "row" ? "flex" : "block",
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
}));

export const ActionIconsConatainerMobile = styled(Box)(() => ({
  display: "flex",
  background: Colors.shaft,
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  alignItems: "center",
  zIndex: 99,
  borderTop: `1px solid ${Colors.border}`,
}));

export const ActionIconsConatainerDesktop = styled(Box)(() => ({
  flexGrow: 0,
}));
