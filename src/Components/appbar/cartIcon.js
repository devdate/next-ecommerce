import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Colors } from "../../theme";
import { CartContext } from "../../context/ColorModeContext";
import Link from "next/link";

function CartIcon() {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link href="/cart">
      <Box
        sx={{ position: "relative", display: "flex", alignItems: "flex-end" }}
      >
        <ShoppingCartIcon color="secondary" />
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
          {totalQuantity}
        </Typography>
      </Box>
    </Link>
  );
}

export default CartIcon;
