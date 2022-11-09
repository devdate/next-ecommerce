import {
  Box,
  Button,
  Divider,
  Drawer,
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
          endIcon={<CloseIcon />}
          sx={{ alignItems: "center" }}
        >
          Close
        </Button>
      </Box>
      <Divider variant="middle" />
      <List>
        {["Home", "About Us", "Contact Us", "Privacy & Policy"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText sx={{ textAlign: "center" }} primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
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
