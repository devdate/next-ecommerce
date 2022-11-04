import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function SingleProduct({ product, matches }) {
  const onClickHandler = (addproduct) => {
    console.log(addproduct);
  };

  return (
    <Card sx={{ maxWidth: 380 }}>
      <CardMedia alt="green iguana" sx={{ height: "240px", width: "240px" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image src={product.image} fill />
        </div>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {product.name}
        </Typography>
        <Typography variant="h5" component="div" align="center">
          ₹{product.price}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <IconButton sx={{ marginBottom: "20px" }} color="error">
          <FavoriteIcon />
        </IconButton>

        <Button
          size="medium"
          variant="contained"
          onClick={() => onClickHandler(product)}
          sx={{ marginBottom: "20px" }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
