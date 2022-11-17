import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  formLabelClasses,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { border } from "@mui/system";
import NextLink from "next/link";
import MaterialUISwitch from "../../styles/menu";
import ColorModeContext from "../../context/ColorModeContext";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const AppMenu = ({ toOpen, setIsopen }) => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const [userExists, setUser] = useState(false);
  const { token, user: userString } = parseCookies();
  const user = userString ? JSON.parse(userString) : null;
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (token) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [token]);
  var doNotClose = false;

  const logoutHandler = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    if (router.pathname === "/account") {
      router.push("/login");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (doNotClose) {
      doNotClose = false;
      return;
    }

    setIsopen(open);
  };

  const eachList = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/",
    },
    {
      name: "Privacy & Policy",
      link: "/",
    },
  ];

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      textAlign="center"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
          alignItems: "center",
        }}
      >
        <Typography
          color="secondary"
          sx={{ wordBreak: "break-word", flex: 1 }}
          maxWidth={150}
          textAlign="center"
        >
          {user ? `Hi! ${user.name}` : "Welcome Guest!"}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ alignItems: "center" }}
        >
          <CloseIcon />
        </Button>
      </Box>
      <Divider variant="middle" />
      <List>
        {eachList.map((eachItem, index) => (
          <NextLink
            key={eachItem.name}
            href={eachItem.link}
            passHref
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <ListItem disablePadding>
              <ListItemButton
                LinkComponent={Link}
                sx={{ justifyContent: "center" }}
              >
                <Typography color="secondary" sx={{ textAlign: "center" }}>
                  {eachItem.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          </NextLink>
        ))}
      </List>
      <Divider variant="middle" />
      <FormGroup
        onClick={() => {
          doNotClose = true;
        }}
      >
        <FormControlLabel
          id="testing"
          control={
            <MaterialUISwitch
              sx={{ m: 1 }}
              onChange={toggleColorMode}
              checked={mode === "dark"}
            />
          }
          sx={{ justifyContent: "center" }}
          label="Dark Mode"
          labelPlacement="start"
        />
      </FormGroup>
      {userExists && (
        <>
          <Divider variant="middle" />
          <Button
            sx={{ marginTop: 2 }}
            variant="outlined"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <Drawer anchor="left" open={toOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default AppMenu;
