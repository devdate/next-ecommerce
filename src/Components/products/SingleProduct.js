import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../../context/ColorModeContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { WindowsIcon } from "../../../src/svgicons";

export default function SingleProduct({ product, matches }) {
  const { cart, addItemtoCart, removeItemfromCart } = useContext(CartContext);

  const onClickHandler = (addproduct) => {
    console.log(addproduct);
    addItemtoCart(addproduct);
  };

  return (
    <Card sx={{ maxWidth: 380, marginTop: "10px", marginBottom: "10px" }}>
      <Link href={`/product/${product.id}`}>
        <CardMedia alt={product.name} sx={{ height: "240px", width: "240px" }}>
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image alt={product.name} src={product.image} fill />
          </div>
        </CardMedia>
      </Link>
      <CardContent p={1}>
        <Link
          href={`/product/${product.id}`}
          passHref
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          <Typography
            variant="h6"
            component="div"
            align="center"
            color="primary"
          >
            {product.name}
          </Typography>
        </Link>
        <Typography variant="h5" component="div" align="center">
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <IconButton color="error">
          <FavoriteIcon />
        </IconButton>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 2, borderColor: "secondary.main" }}
        />
        {!!cart.length &&
          cart.findIndex((eachItem) => eachItem.id === product.id) >= 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <WindowsIcon
                color="secondary"
                viewBox="0 0 71 15"
                style={{ width: "85px", marginBottom: "8px" }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => removeItemfromCart(product)}
                  variant="outlined"
                  size="small"
                  p={0}
                  sx={{ border: "1px solid" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="subtitle1"
                  fontWeight={500}
                  color="secondary"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  &nbsp;&nbsp;
                  {cart.find((eachItem) => eachItem.id === product.id).quantity}
                  &nbsp;&nbsp;
                </Typography>
                <IconButton
                  onClick={() => addItemtoCart(product)}
                  variant="outlined"
                  size="small"
                  p={0}
                  m={0}
                  sx={{ border: "1px solid" }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        {(!cart.length ||
          cart.findIndex((eachItem) => eachItem.id === product.id) < 0) && (
          <Button
            size="medium"
            variant="contained"
            onClick={() => onClickHandler(product)}
          >
            Add To Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
