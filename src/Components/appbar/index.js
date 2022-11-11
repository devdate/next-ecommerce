import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AppbarHeader from "./appbarHeader";

export default function Appbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
  return <AppbarHeader matches={matches} />;
}
