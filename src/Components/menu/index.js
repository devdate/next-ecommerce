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
import React, { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { border } from "@mui/system";
import NextLink from "next/link";
import MaterialUISwitch from "../../styles/menu";
import ColorModeContext from "../../context/ColorModeContext";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";

const AppMenu = ({ toOpen, setIsopen }) => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  let user = false;
  const { token } = parseCookies();
  if (token) {
    user = true;
  }
  var doNotClose = false;

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
          justifyContent: "right",
          padding: 2,
          alignItems: "center",
        }}
      >
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
      {user && (
        <>
          <Divider variant="middle" />
          <Button
            sx={{ marginTop: 2 }}
            variant="outlined"
            onClick={() => {
              Cookies.remove("user");
              Cookies.remove("token");
            }}
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
