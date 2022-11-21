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
  formLabelClasses,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState, useEffect, useLayoutEffect } from "react";
import ColorModeContext, {
  alertContext,
  CartContext,
  UserContext,
} from "../../context/ColorModeContext";
import Link from "next/link";
import AppMenu from "../menu";
import CartIcon from "./cartIcon";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";

export default function AppbarHeader({ matches }) {
  //console.log(matches);
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [userRendered, setUserRendered] = useState(false);
  const { resetCart, cart, totalQuantity } = useContext(CartContext);
  const { OpenAlert, alertData, toggleLoading } = useContext(alertContext);

  //const { token } = parseCookies();

  const { token, removeUserContext } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      //console.log(token);
      if (token) {
        setUser(true);
        setUserRendered(true);
        try {
          const resp = await axios.get(`${process.env.PUBLIC_URL}/api/cart`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          if (totalQuantity !== resp.data.totalQuantity) {
            resetCart(
              resp.data.viewCart,
              resp.data.totalPrice,
              resp.data.totalQuantity
            );
          }
          //console.log(token);
        } catch (err) {
          console.log(err.response.data);
          removeUserContext();
          alertData.type = "error";
          alertData.msg = err.response.data.error;
          alertData.time = 2000;
          OpenAlert();
          router.push("/login");
        }
      } else {
        setUserRendered(true);
        //console.log(userRendered);
        setUser(false);
        removeUserContext();
        if (totalQuantity) {
          resetCart([], 0, 0);
        }
      }
    })(),
      [token, cart];
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mode } = useContext(ColorModeContext);

  const [boxShadow, setBoxShadow] = useState("0 0 5px 10px #FFFFFF96");
  const [boxBackground, setBoxBackground] = useState("rgba(255,255,255,0.6)");

  useEffect(() => {
    if (mode === "light") {
      setBoxShadow("0 0 10px 14px #FFFFFF96");
      setBoxBackground("rgba(255,255,255,0.6)");
    } else {
      setBoxShadow("0 0 10px 14px #00000096");
      setBoxBackground("rgba(0,0,0,0.6)");
    }
  }, [mode]);

  const onSearch = (event) => {
    console.log("clicked");
  };

  const toggleMenu = (test) => {
    setIsMenuOpen(test);
  };

  return (
    <AppbarContainer
      sx={
        matches &&
        router.pathname === "/" && {
          width: "100%",
          position: "fixed",
          top: "0",
          boxShadow: boxShadow,
          left: "0",
          zIndex: "999",
          background: boxBackground,
        }
      }
    >
      <Button
        onClick={() => toggleMenu(true)}
        disableRipple
        sx={{
          marginRight: matches ? 3 : 0,
          flexGrow: 0,
          justifyContent: "center",
          display: "flex",
          ...(matches &&
            router.pathname === "/" && {
              boxShadow: boxShadow,
              background: boxBackground,
            }),
          "&:hover": {
            bgcolor: "background.default",
          },
        }}
      >
        <MenuIcon fontSize={matches ? "large" : "medium"} />
      </Button>
      <AppMenu toOpen={isMenuOpen} setIsopen={toggleMenu} />
      <Link
        href="/"
        style={{ flexGrow: matches ? 0 : 1 }}
        onClick={() => {
          router.pathname !== "/" ? toggleLoading(true) : null;
          //console.log(router.pathname);
        }}
      >
        <AppbarHeaderImage paddingRight={{ xs: "4px", sm: "4px", md: "24px" }}>
          <Image
            priority
            src={mode === "light" ? logo : logoDark}
            width={matches ? 179 : 132}
            height={matches ? 34 : 25}
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
            "&.Mui-focused": {
              bgcolor: "background.default",
            },
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
                  "&:hover": { backgroundColor: "#00646d" },
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
      <Button
        disableRipple
        onClick={() =>
          router.pathname !== "/cart" ? toggleLoading(true) : null
        }
        sx={{
          flexGrow: 0,
          marginLeft: matches ? 3 : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: { sm: "0px", md: "0px", lg: "24px" },
          ...(matches &&
            router.pathname === "/" && {
              boxShadow: boxShadow,
              background: boxBackground,
            }),
          "&:hover": {
            bgcolor: "background.default",
          },
        }}
      >
        <CartIcon fontSize={matches ? "large" : "medium"} />
      </Button>
      {!user && userRendered && (
        <Link
          href="/login"
          style={{ textDecoration: "none", textAlign: "center" }}
          onClick={() =>
            router.pathname !== "/login" ? toggleLoading(true) : null
          }
        >
          <Button
            disableRipple
            variant="outlined"
            color="secondary"
            sx={{
              "&:hover": {
                bgcolor: "background.default",
              },

              ...(matches &&
                router.pathname === "/" && {
                  boxShadow: boxShadow,
                  background: boxBackground,
                }),
            }}
          >
            Login
          </Button>
        </Link>
      )}
      {user && userRendered && (
        <Button
          onClick={() => {
            if (router.pathname !== "/account") {
              toggleLoading(true);
              router.push("/account");
            }
          }}
          disableRipple
          sx={{
            flexGrow: 0,
            marginLeft: matches ? 3 : 0,
            justifyContent: "center",
            alignItems: "center",
            marginRight: { sm: "0px", md: "0px", lg: "24px" },
            ...(matches &&
              router.pathname === "/" && {
                boxShadow: boxShadow,
                background: boxBackground,
              }),
            "&:hover": {
              bgcolor: "background.default",
            },
          }}
        >
          <AccountCircleIcon
            color="secondary"
            fontSize={matches ? "large" : "medium"}
          />
        </Button>
      )}
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
