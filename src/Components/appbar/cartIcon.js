import { Box, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../theme";

function CartIcon() {
  return (
    <Box sx={{ position: "relative", display: "flex", alignItems: "flex-end" }}>
      <ShoppingCartIcon />
      <Typography
        variant="caption"
        position="absolute"
        sx={{ right: -10, top: -10 }}
        borderRadius="50%"
        bgcolor={Colors.primary}
        width="20px"
        height="20px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="white"
        p="3px"
        fontWeight={500}
      >
        2
      </Typography>
    </Box>
  );
}

export default CartIcon;
