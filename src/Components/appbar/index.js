import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//import useCustomMediaQuery from "../../helper/mediaquery";
import AppbarDesktop from "./appbarDesktop";
import AppbarMobile from "./appbarMobile";

export default function Appbar() {
  const theme = useTheme();
  //const match1 = useCustomMediaQuery(900);
  //console.log(match1);
  const matches = useMediaQuery("(max-width:900px)", { noSsr: true });
  console.log("matches ", matches);
  return (
    <>
      {matches ? (
        <AppbarMobile props={matches} />
      ) : (
        <AppbarDesktop props={matches} />
      )}
    </>
  );
}
