import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { Product, ProductImage } from "../../styles/Products";
import ProductMeta from "./ProductMeta";

export default function SingleProduct({ product, matches }) {
  const onClickHandler = (addproduct) => {
    console.log(addproduct);
  };

  return (
    <>
      {/*<Product>
      <Image src={product.image} width={200} height={240} />
      <h6>Tsting long</h6>
      <ProductMeta product={product} matches={matches}></ProductMeta>
    </Product>
  */}
      <Card sx={{ maxWidth: 340 }}>
        <CardMedia alt="green iguana" height="140">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image src={product.image} layout="fill" objectFit="cover" />
          </div>
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div" align="center">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center">
            ₹{product.price}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
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
    </>
  );
}
