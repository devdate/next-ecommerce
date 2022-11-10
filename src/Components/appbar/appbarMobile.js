import { Button, IconButton } from "@mui/material";
import { AppbarContainer, AppbarHeaderImage } from "../../styles/appbar";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useContext, useState } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import logo from "../../../public/images/logo/logo.png";
import logoDark from "../../../public/images/logo/logoDark.png";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";
import AppMenu from "../menu";
import CartIcon from "./cartIcon";

export default function AppbarMobile({ props }) {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (test) => {
    setIsMenuOpen(test);
  };

  return (
    <AppbarContainer>
      <IconButton
        onClick={() => toggleMenu(true)}
        disableRipple
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "left",
        }}
      >
        <MenuIcon fontSize="medium" />
      </IconButton>
      <AppMenu toOpen={isMenuOpen} setIsopen={toggleMenu} />
      <Link href="/" style={{ flexGrow: 1 }}>
        <AppbarHeaderImage
          sx={{
            paddingLeft: "10px",
            display: "flex",
            justifyContent: "left",
            flexGrow: 1,
          }}
        >
          <Image
            src={mode === "light" ? logo : logoDark}
            width={132}
            height={25}
            alt="logo"
          ></Image>
        </AppbarHeaderImage>
      </Link>
      <IconButton
        disableRipple
        sx={{
          flexGrow: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "24px",
        }}
      >
        <CartIcon />
      </IconButton>
      <Button disableRipple variant="outlined" color="secondary">
        Login
      </Button>
    </AppbarContainer>
  );
}
