import { AppbarContainer, AppbarHeaderImage } from "../../styles/appbar";
import logo from "../../../public/images/logo/logo.png";
import logoDark from "../../../public/images/logo/logoDark.png";

import Image from "next/image";
import {
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { useContext, useState } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import Link from "next/link";
import AppMenu from "../menu";

export default function AppbarDesktop({ props }) {
  //console.log(logo);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode } = useContext(ColorModeContext);

  const onSearch = (event) => {
    console.log("clicked");
  };

  const toggleMenu = (test) => {
    setIsMenuOpen(test);
  };

  return (
    <AppbarContainer>
      <IconButton
        onClick={() => toggleMenu(true)}
        disableRipple
        sx={{
          flexGrow: 1,
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <AppMenu toOpen={isMenuOpen} setIsopen={toggleMenu} />
      <Link href="/">
        <AppbarHeaderImage sx={{}}>
          <Image
            src={mode === "light" ? logo : logoDark}
            width={179}
            height={34}
            alt="logo"
          ></Image>
        </AppbarHeaderImage>
      </Link>
      {/*<MyList type="row">*/}
      {/* <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search> */}
      <FormControl
        variant="outlined"
        sx={{
          flexGrow: 5,
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

      <Actions matches />

      {/*</MyList>*/}
    </AppbarContainer>
    /*
  Appbar Container
  Header
  List
  
  
  */
  );
}
