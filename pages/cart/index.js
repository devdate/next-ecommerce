import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "../../src/context/ColorModeContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function MyCart() {
  const { cart, totalQuantity, totalPrice, addItemtoCart, removeItemfromCart } =
    useContext(CartContext);

  return (
    <Container maxWidth="xl" disableGutters>
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
                    <Image src={eachItem.image} fill />
                  </div>
                </CardMedia>
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      flexGrow: 1,
                      paddingLeft: 2,
                      wordBreak: "break-word",
                    }}
                  >
                    {eachItem.name}
                  </Typography>
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
                      ₹{eachItem.price} &nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;
                    </Typography>
                    <IconButton
                      onClick={() => removeItemfromCart(eachItem)}
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
                      onClick={() => addItemtoCart(eachItem)}
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
                      {eachItem.price * eachItem.quantity}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
        </Grid>
        <Grid
          onClick={() => console.log(cart)}
          item
          sm={12}
          md={6}
          sx={{ position: "relative" }}
          marginTop={{ xs: 4, sm: 4, md: 0, lg: 0 }}
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

export default MyCart;
