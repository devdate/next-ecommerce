import { Button, IconButton } from "@mui/material";
import { AppbarContainer, AppbarHeaderImage } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useContext } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import logo from "../../../public/images/logo/logo.png";
import logoDark from "../../../public/images/logo/logoDark.png";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function AppbarMobile({ props }) {
  const { mode } = useContext(ColorModeContext);

  return (
    <AppbarContainer>
      <IconButton
        disableRipple
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <MenuIcon fontSize="medium" />
      </IconButton>
      <AppbarHeaderImage
        sx={{ paddingLeft: "10px", display: "flex", justifyContent: "left" }}
      >
        <Image
          src={mode === "light" ? logo : logoDark}
          width={132}
          height={25}
          alt="logo"
        ></Image>
      </AppbarHeaderImage>
      <IconButton
        disableRipple
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "right",
        }}
      >
        <ShoppingCartIcon fontSize="medium" />
      </IconButton>
      <Button disableRipple variant="outlined">
        Login
      </Button>
    </AppbarContainer>
  );
}
