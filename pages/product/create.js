import {
  Alert,
  Box,
  Button,
  Card,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";
import axios from "axios";
import { parseCookies } from "nookies";

const Create = () => {
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPriceWin, setProductPriceWin] = useState(0);
  const [productPriceXbox, setProductPriceXbox] = useState(0);
  const [productPricePs5, setProductPricePs5] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const submiHandler = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setLoading(true);
    // console.log(
    //   productName,
    //   productDesc,
    //   productPriceWin,
    //   productPriceXbox,
    //   productPricePs5,
    //   productImage
    // );
    if (
      !productName ||
      !productDesc ||
      !productImage ||
      productPriceWin <= 0 ||
      productPriceXbox <= 0 ||
      productPricePs5 <= 0
    ) {
      setLoading(false);
      setErrorMsg("Please check all fields");
      setErrorOpen(true);
      return;
    }
    try {
      const productImageUrl = await imageUpload();
      const res = await axios.post(`${process.env.PUBLIC_URL}/api/products`, {
        name: productName,
        description: productDesc,
        image: productImageUrl,
        prices: [productPriceWin, productPriceXbox, productPricePs5],
      });
      setSuccessOpen(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg("Something went wrong!");
      setErrorOpen(true);
      console.log(err);
    }
  };

  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", productImage);
    data.append("upload_preset", "gamerscart");
    data.append("cloud_name", "dkfcc21kf");
    try {
      const imgres = await axios.post(
        "https://api.cloudinary.com/v1_1/dkfcc21kf/image/upload",
        data
      );
      return imgres.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      display="flex"
      flexDirection="column"
      marginTop={4}
      padding={2}
    >
      <Typography variant="h4" fontWeight={500}>
        Add Product
      </Typography>
      <Card sx={{ maxWidth: "md", width: "100%", padding: 4, marginTop: 4 }}>
        <TextField
          required
          id="ProductName"
          label="Name"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          error={isSubmitted && productName === ""}
          helperText={
            isSubmitted && productName === "" ? "This field is required" : ""
          }
        />
        <TextField
          required
          id="Description"
          label="Description"
          fullWidth
          multiline
          minRows={3}
          value={productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
          error={isSubmitted && productDesc === ""}
          helperText={
            isSubmitted && productDesc === "" ? "This field is required" : ""
          }
          sx={{ marginTop: 2 }}
        />
        <Box
          justifyContent="center"
          alignItems="start"
          textAlign="center"
          display="flex"
          flexDirection={{ xs: "column", sm: "row", md: "row" }}
          marginTop={2}
          gap={2}
        >
          <TextField
            required
            id="PriceWindows"
            label="Price for Windows"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            value={productPriceWin}
            onChange={(e) => setProductPriceWin(e.target.value)}
            error={
              isSubmitted && (productPriceWin === "" || productPriceWin <= 0)
            }
            helperText={
              isSubmitted
                ? productPriceWin === ""
                  ? "This field is required"
                  : productPriceWin <= 0
                  ? "Price should be greater than 0"
                  : ""
                : ""
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="PriceXbox"
            label="Price for XBox"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            value={productPriceXbox}
            onChange={(e) => setProductPriceXbox(e.target.value)}
            error={
              isSubmitted && (productPriceXbox === "" || productPriceXbox <= 0)
            }
            helperText={
              isSubmitted
                ? productPriceXbox === ""
                  ? "This field is required"
                  : productPriceXbox <= 0
                  ? "Price should be greater than 0"
                  : ""
                : ""
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            required
            id="PricePs5"
            label="Price for PS5"
            type="number"
            fullWidth
            inputProps={{ min: 0 }}
            value={productPricePs5}
            onChange={(e) => setProductPricePs5(e.target.value)}
            error={
              isSubmitted && (productPricePs5 === "" || productPricePs5 <= 0)
            }
            helperText={
              isSubmitted
                ? productPricePs5 === ""
                  ? "This field is required"
                  : productPricePs5 <= 0
                  ? "Price should be greater than 0"
                  : ""
                : ""
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box
          flexDirection={{ xs: "column", sm: "row", md: "row" }}
          gap={2}
          alignItems={{ xs: "center", sm: "start", md: "start" }}
          sx={{
            marginTop: 4,
            textAlign: "center",
            display: "flex",
          }}
        >
          <Box flex={1} textAlign="left">
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                accept="image/*"
                type="file"
                onChange={(e) => setProductImage(e.target.files[0])}
              />
              <Button
                component="span"
                aria-label="add"
                variant="outlined"
                color={
                  isSubmitted && productImage === "" ? "error" : "secondary"
                }
              >
                <CloudUploadIcon /> &nbsp;&nbsp;Upload photo*
              </Button>
              {isSubmitted && productImage === "" && (
                <Typography color="error" fontSize={12}>
                  Image is required
                </Typography>
              )}
            </label>
          </Box>
          {productImage && (
            <Image
              alt="Product Image"
              src={productImage ? URL.createObjectURL(productImage) : ""}
              width={150}
              height={150}
              style={{
                objectFit: "contain",
                flex: 1,
                width: "100%",
                height: "auto",
              }}
            />
          )}
          <Box flex={1} textAlign="right">
            <LoadingButton
              variant="contained"
              type="submit"
              onClick={submiHandler}
              loading={loading}
              endIcon={<SendIcon />}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Created Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  if (!user) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
  } else if (user.role == "user") {
    const { res } = ctx;
    res.writeHead(302, { Location: "/" });
    res.end();
  }
  return {
    props: {},
  };
}

export default Create;
