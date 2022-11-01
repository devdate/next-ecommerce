import {
  AppbarContainer,
  AppbarHeaderImage,
  MyList,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../styles/appbar";
import logo from "../../../assests/logo/logo.png";
import logoDark from "../../../assests/logo/logoDark.png";

import Image from "next/image";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputAdornment,
  TextField,
  IconButton,
  FormControl,
  FilledInput,
  OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Actions from "./actions";
import { useContext } from "react";
import ColorModeContext from "../../context/ColorModeContext";

export default function AppbarDesktop({ props }) {
  //console.log(logo);

  const onSearch = (event) => {
    console.log("clicked");
  };

  const { mode } = useContext(ColorModeContext);
  return (
    <AppbarContainer>
      <IconButton
        disableRipple
        sx={{
          flexGrow: 1,
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <AppbarHeaderImage sx={{}}>
        <Image
          src={mode === "light" ? logo : logoDark}
          width={179}
          height={34}
          alt="logo"
        ></Image>
      </AppbarHeaderImage>
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
                <SearchIcon color="secondary" />
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
