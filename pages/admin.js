import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Colors } from "../src/theme";

const Admin = ({ user, productsData }) => {
  return (
    <Container maxWidth="xxxl" disableGutters>
      <Typography variant="h3" textAlign="center" marginTop={2}>
        ADMIN Panel
      </Typography>
      <Grid container padding="20px 16px">
        <Grid
          item
          sm={12}
          md={6}
          sx={{
            width: "100%",
            justifyContent: "start",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Link href="/product/create" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ marginBottom: 4 }}
            >
              Add Product
            </Button>
          </Link>
          <Typography variant="h6" marginBottom={2}>
            Products
          </Typography>
          <Divider sx={{ width: "100%", marginBottom: 2 }} variant="middle" />

          {(!productsData || !productsData.length) && (
            <Typography>No Product!</Typography>
          )}
          {productsData &&
            !!productsData.length &&
            productsData.map((eachItem) => (
              <Card
                key={eachItem.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "8px",
                  marginBottom: "8px",
                }}
              >
                <CardMedia
                  key={eachItem.id}
                  alt={eachItem.name}
                  sx={{ height: "100%", width: "60px" }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <Image src={eachItem.image} alt={eachItem.name} fill />
                  </div>
                </CardMedia>
                <Box
                  key={eachItem.id}
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="h6"
                      textAlign="left"
                      sx={{
                        flexGrow: 1,
                        paddingLeft: 2,
                        wordBreak: "break-word",
                      }}
                    >
                      {eachItem.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      textAlign="right"
                      sx={{
                        flexGrow: 1,
                        paddingLeft: 2,
                        wordBreak: "break-word",
                        marginRight: 2,
                      }}
                    >
                      Prices: Win-₹{eachItem.prices[0]}, XBox-₹
                      {eachItem.prices[1]}, Ps5-₹
                      {eachItem.prices[2]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      padding: "0px 16px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: "left",
                        flex: "45%",
                      }}
                    >
                      {`${eachItem.description.slice(0, 50)} ${
                        eachItem.description.length <= 50 ? "" : "..."
                      }`}
                    </Typography>
                    <IconButton
                      onClick={() => console.log(eachItem)}
                      className="hidden-button"
                      variant="outlined"
                      size="small"
                      sx={{
                        border: "1px solid",
                        marginRight: 2,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": {
                          bgcolor: `${Colors.primary}ba`,
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => console.log(eachItem)}
                      className="hidden-button"
                      variant="contained"
                      size="small"
                      p={0}
                      m={0}
                      sx={{
                        border: "1px solid",
                        bgcolor: "error.main",
                        color: "white",
                        "&:hover": {
                          bgcolor: `${Colors.danger}ba`,
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          marginTop={{ xs: 4, sm: 4, md: 0, lg: 0 }}
          paddingLeft={{ xs: 0, sm: 0, md: 4, lg: 4 }}
          paddingRight={{ xs: 0, sm: 0, md: 4, lg: 4 }}
          textAlign="center"
          flexGrow={1}
        >
          <Card
            sx={{
              textAlign: "center",
              padding: "24px",
              wordWrap: "break-word",
            }}
          >
            <Typography
              variant="h4"
              borderBottom={1}
              textAlign="left"
              marginBottom={4}
              fontWeight={600}
              display="flex"
              justifyContent="space-between"
            >
              <span>Total</span>
              <span> ₹</span>
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="cod"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="cod"
                  control={<Radio />}
                  label="Cash On Delivery"
                />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              </RadioGroup>
            </FormControl>
          </Card>
          <Button sx={{ marginTop: "16px" }} variant="contained">
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Container>
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

  const res = await axios.get(`${process.env.PUBLIC_URL}/api/products`);
  return {
    props: {
      productsData: res.data,
      user,
    },
  };
}

export default Admin;
