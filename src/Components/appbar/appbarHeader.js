import { AppbarContainer, AppbarHeaderImage } from "../../styles/appbar";
import logo from "../../../public/images/logo/logo.png";
import logoDark from "../../../public/images/logo/logoDark.png";

import Image from "next/image";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import Link from "next/link";
import AppMenu from "../menu";
import CartIcon from "./cartIcon";

export default function AppbarHeader({ matches }) {
  //console.log(matches);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode } = useContext(ColorModeContext);

  const onSearch = (event) => {
    console.log("clicked");
  };

  const toggleMenu = (test) => {
    setIsMenuOpen(test);
  };

  return (
    <AppbarContainer marginLeft={matches ? 3 : 0} marginRight={matches ? 3 : 0}>
      <IconButton
        onClick={() => toggleMenu(true)}
        disableRipple
        sx={{
          paddingRight: matches ? 3 : 1,
          flexGrow: 0,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <MenuIcon fontSize={matches ? "large" : "medium"} />
      </IconButton>
      <AppMenu toOpen={isMenuOpen} setIsopen={toggleMenu} />
      <Link href="/" style={{ flexGrow: matches ? 0 : 1 }}>
        <AppbarHeaderImage>
          <Image
            priority
            src={mode === "light" ? logo : logoDark}
            width={179}
            height={34}
            alt="logo"
          ></Image>
        </AppbarHeaderImage>
      </Link>

      <FormControl
        variant="outlined"
        sx={{
          flexGrow: 7,
          display: { xs: "none", sm: "none", md: "block" },
          //justifyContent: "center",
          //alignItems: "center",
        }}
      >
        <OutlinedInput
          sx={{
            borderRadius: "30px",
            paddingLeft: "10px",
            paddingRight: "0px",
          }}
          fullWidth={true}
          //label="Search..."
          endAdornment={
            <InputAdornment
              position="end"
              sx={{
                height: "100%",
              }}
            >
              <IconButton
                color="primary"
                onClick={onSearch}
                sx={{
                  backgroundColor: "#00646d",
                  //borderRadius: "20px",
                  borderEndStartRadius: "0px",
                  borderTopLeftRadius: "0px",
                  //borderTopRightRadius: "30px",
                  height: "100%",
                  paddingTop: "15.5px",
                  paddingBottom: "16.5px",
                  paddingRight: "20px",
                  paddingLeft: "10px",
                }}
              >
                <SearchIcon sx={{ color: "white" }} />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            placeholder: "Search...",
          }}
        />
      </FormControl>
      <IconButton
        disableRipple
        sx={{
          flexGrow: 0,
          paddingLeft: matches ? 3 : 0,
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
      {/*<Actions matches />*/}

      {/*</MyList>*/}
    </AppbarContainer>
    /*
  Appbar Container
  Header
  List
  
  
  */
  );
}
