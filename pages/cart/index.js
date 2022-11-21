import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import {
  alertContext,
  CartContext,
  UserContext,
} from "../../src/context/ColorModeContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Ps5Icon, WindowsIcon, XboxIcon } from "../../src/svgicons";
import NextLink from "next/link";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";

function MyCart({ cartfromServer, error }) {
  const { cart, totalPrice, addItemtoCart, removeItemfromCart, resetCart } =
    useContext(CartContext);
  const { token, user, removeUserContext } = useContext(UserContext);
  const { OpenAlert, alertData } = useContext(alertContext);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      removeUserContext();
      alertData.type = "error";
      alertData.msg = error;
      alertData.time = 2000;
      OpenAlert();
      router.push("/login");
    }
    console.log(cartfromServer);
    if (
      cartfromServer &&
      cartfromServer.viewCart &&
      cartfromServer.viewCart.length > 0
    ) {
      resetCart(
        cartfromServer.viewCart,
        cartfromServer.totalPrice,
        cartfromServer.totalQuantity
      );
    }
  }, []);

  return (
    <Container maxWidth="xxxl" disableGutters>
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
          {!cart.length && <Typography>No Items in Cart!</Typography>}
          {!!cart.length &&
            cart.map((eachItem) => (
              <Card
                key={`${eachItem._id}${eachItem.variant}`}
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
                  key={eachItem._id}
                  alt={eachItem.name}
                  sx={{ height: "100%", width: "60px" }}
                >
                  <NextLink href={`/product/${eachItem._id}`}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image src={eachItem.image} alt={eachItem.name} fill />
                    </div>
                  </NextLink>
                </CardMedia>
                <Box
                  key={eachItem.id}
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingRight: 1,
                      paddingTop: "4px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={16}
                      sx={{
                        flexGrow: 0,
                        paddingLeft: 2,
                        wordBreak: "break-word",
                      }}
                    >
                      {eachItem.name}
                    </Typography>
                    {eachItem.variant === 0 && (
                      <WindowsIcon
                        viewBox="0 0 71 15"
                        style={{ width: "85px" }}
                      />
                    )}
                    {eachItem.variant === 1 && (
                      <XboxIcon viewBox="0 0 66 20" style={{ width: "85px" }} />
                    )}
                    {eachItem.variant === 2 && (
                      <Ps5Icon viewBox="0 0 66 15" style={{ width: "85px" }} />
                    )}
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
                        textAlign: "right",
                        flex: "45%",
                      }}
                    >
                      ₹{eachItem.prices[eachItem.variant]}
                      &nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <IconButton
                      onClick={() =>
                        removeItemfromCart(eachItem, eachItem.variant)
                      }
                      variant="outlined"
                      size="small"
                      p={0}
                      m={0}
                      sx={{ border: "1px solid" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography
                      variant="subtitle2"
                      color="secondary"
                      sx={{
                        flex: "5%",
                        textAlign: "center",
                      }}
                    >
                      &nbsp;&nbsp;{eachItem.quantity}&nbsp;&nbsp;
                    </Typography>
                    <IconButton
                      onClick={() =>
                        addItemtoCart(eachItem, eachItem.variant, token)
                      }
                      variant="outlined"
                      size="small"
                      p={0}
                      m={0}
                      sx={{ border: "1px solid" }}
                    >
                      <AddIcon />
                    </IconButton>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        flex: "45%",
                        textAlign: "left",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;=&nbsp;&nbsp;&nbsp;₹
                      {eachItem.prices[eachItem.variant] * eachItem.quantity}
                    </Typography>
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
              <span> ₹{totalPrice}</span>
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
        <Grid
          item
          sm={12}
          md={12}
          marginTop={4}
          paddingLeft={{ xs: 0, sm: 0, md: 4, lg: 4 }}
          paddingRight={{ xs: 0, sm: 0, md: 4, lg: 4 }}
        >
          <Card
            sx={{
              textAlign: "center",
              padding: "24px",
              wordWrap: "break-word",
            }}
          >
            <Typography
              variant="h6"
              borderBottom={1}
              textAlign="center"
              marginBottom={4}
            >
              Tariq Anwar
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              sx={{ wordBreak: "break-word" }}
            >
              Young mind from Bangalore, passionate in Web Development and UI
              Development.
              <br />
              <br />
              Contact: &nbsp;
              <Link href="mailto:tariqanwar5897@gmail.com" target="_blank">
                tariqanwar5897@gmail.com
              </Link>
              <br />
              LinkedIn: &nbsp;
              <Link
                href="https://www.linkedin.com/in/tariqanwar5897/"
                target="_blank"
              >
                https://www.linkedin.com/in/tariqanwar5897/
              </Link>
              <br />
              <br />
              This project is built using ReactJS, NextJS and MaterialUI as a
              Proof Of Concept
              <br />
              <br />
              Project Link: &nbsp;
              <Link
                href=" https://github.com/devdate/next-ecommerce"
                target="_blank"
              >
                https://github.com/devdate/next-ecommerce
              </Link>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  const { res } = ctx;
  if (!token) {
    // res.writeHead(302, { Location: "/login" });
    // res.end();
    // return;
    return {
      props: {
        error: "You Must Login",
      },
    };
  }
  try {
    const resp = await axios.get(`${process.env.PUBLIC_URL}/api/cart`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return {
      props: {
        cartfromServer: resp.data,
      },
    };
  } catch (err) {
    console.log(err.response.data);
    //res.writeHead(401, { Location: "/login" });
    //res.end();
    return {
      props: {
        error: err.response.data.error,
      },
    };
  }
}

export default MyCart;
