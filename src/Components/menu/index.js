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

const AppMenu = ({ toOpen, setIsopen }) => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
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
          console.log("called");
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
    </Box>
  );

  return (
    <Drawer anchor="left" open={toOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default AppMenu;
