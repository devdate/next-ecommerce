import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { border } from "@mui/system";
import NextLink from "next/link";

const AppMenu = ({ toOpen, setIsopen }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(toOpen);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
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
            href={eachItem.link}
            passHref
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <ListItem key={eachItem.name} disablePadding>
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
    </Box>
  );

  return (
    <Drawer anchor="left" open={toOpen} onClose={toggleDrawer(false)}>
      {list()}
    </Drawer>
  );
};

export default AppMenu;
