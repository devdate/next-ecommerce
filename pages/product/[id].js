import {
  Box,
  Button,
  Card,
  Collapse,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import Image from "next/image";
import { Ps5Icon, WindowsIcon, XboxIcon } from "../../src/svgicons";
import axios from "axios";
import {
  alertContext,
  CartContext,
  UserContext,
} from "../../src/context/ColorModeContext";
import Router from "next/router";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";

const Product = ({ game }) => {
  // const game = {
  //   id: 1,
  //   name: "Call Of Duty MW3",
  //   price: 200,
  //   image: "/images/products/codmw3.jpg",
  //   description:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  // };

  const { cart, addItemtoCart, removeItemfromCart } = useContext(CartContext);
  const { token, removeUserContext } = useContext(UserContext);
  const { OpenAlert, alertData, toggleLoading } = useContext(alertContext);

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const [gameVariant, setGameVariant] = useState(0);
  const changeGameVariant = (id) => {
    setGameVariant(id);
  };

  useEffect(() => {
    toggleLoading(false);
  }, []);

  const onClickHandler = async (addproduct, variant) => {
    if (!token) {
      alertData.type = "error";
      alertData.msg = "Please login first";
      alertData.time = 2000;
      OpenAlert();
      removeUserContext();
      Router.push("/login");
      return;
    }

    const err = await addItemtoCart(addproduct, variant, token);
    //console.log("err", err);
    if (err) {
      alertData.type = "error";
      alertData.msg = err.response.data.error;
      alertData.time = 2000;
      OpenAlert();
      removeUserContext();
      Router.push("/login");
      return;
    }
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container justifyContent="center" p={{ xs: 3, sm: 3, md: 6 }}>
        <Grid
          item
          sm={12}
          md={12}
          lg={12}
          sx={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box paddingBottom={4}>
            <Typography
              variant="h4"
              textAlign="center"
              borderBottom={2}
              color="secondary"
            >
              {game.name}
            </Typography>
          </Box>
        </Grid>
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
          <Box
            sx={{
              position: "relative",
              height: "402px",
              width: "334px",
            }}
          >
            <Image
              src={game.image}
              alt={game.name}
              fill
              style={{
                objectFit: "contain",
                borderRadius: "5%",
              }}
            ></Image>
          </Box>
          <Card
            sx={{
              width: "100%",
              maxWidth: "300px",
              padding: "10px 30px",
              margin: "20px",
            }}
          >
            <Box
              sx={{
                flex: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderRadius: "500px",
                  padding: "8px 16px",
                  border: "1px solid",
                  margin: "16px 0px",
                }}
              >
                Price: ₹{game.prices[gameVariant]}
              </Typography>
            </Box>
            {(!cart.length ||
              cart.findIndex(
                (eachItem) =>
                  eachItem._id === game._id && eachItem.variant === gameVariant
              ) < 0) && (
              <Button
                variant="contained"
                size="large"
                sx={{ margin: 2 }}
                onClick={() => onClickHandler(game, gameVariant)}
              >
                Add to cart
              </Button>
            )}
            {!!cart.length &&
              cart.findIndex(
                (eachItem) =>
                  eachItem._id === game._id && eachItem.variant === gameVariant
              ) >= 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 2,
                  }}
                >
                  <IconButton
                    onClick={() => removeItemfromCart(game, gameVariant, token)}
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
                    {
                      cart.find(
                        (eachItem) =>
                          eachItem._id === game._id &&
                          eachItem.variant === gameVariant
                      ).quantity
                    }
                    &nbsp;&nbsp;
                  </Typography>
                  <IconButton
                    onClick={() => onClickHandler(game, gameVariant)}
                    variant="outlined"
                    size="small"
                    p={0}
                    m={0}
                    sx={{ border: "1px solid" }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              )}
          </Card>
        </Grid>
        <Grid item sm={12} md={6} marginTop={{ xs: 2, sm: 2, md: 0, lg: 0 }}>
          <Card sx={{ padding: "24px" }}>
            <Typography
              variant="h6"
              borderBottom={1}
              textAlign="center"
              marginBottom={4}
            >
              Choose Variant:
            </Typography>
            <Box
              justifyContent="space-evenly"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
              }}
            >
              <Tooltip title="Windows® 7/8.1/10/11" placement="top">
                <Button
                  variant={gameVariant == 0 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => changeGameVariant(0)}
                  sx={{
                    flex: "1",
                    minWidth: "130px",
                    margin: "8px",
                  }}
                >
                  <WindowsIcon viewBox="0 0 71 15" style={{ width: "85px" }} />
                </Button>
              </Tooltip>
              <Tooltip title="Xbox" placement="top">
                <Button
                  variant={gameVariant == 1 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => changeGameVariant(1)}
                  sx={{
                    flex: "1",
                    minWidth: "130px",
                    margin: "8px",
                  }}
                >
                  <XboxIcon viewBox="0 0 66 20" style={{ width: "85px" }} />
                </Button>
              </Tooltip>
              <Tooltip title="PlayStation®5" placement="top">
                <Button
                  variant={gameVariant == 2 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => changeGameVariant(2)}
                  sx={{ flex: "1", minWidth: "130px", margin: "8px" }}
                >
                  <Ps5Icon viewBox="0 0 66 15" style={{ width: "85px" }} />
                </Button>
              </Tooltip>
            </Box>
          </Card>
          <Card
            sx={{ textAlign: "center", padding: "24px", marginTop: "24px" }}
          >
            <Typography
              variant="h6"
              borderBottom={1}
              textAlign="center"
              marginBottom={4}
            >
              Description
            </Typography>

            <Collapse in={!isReadMore} collapsedSize={100}>
              <Typography variant="body1" textAlign="center">
                {game.description}
              </Typography>
            </Collapse>
            <Button
              variant="outlined"
              color="secondary"
              onClick={toggleReadMore}
              sx={{ marginTop: 4 }}
            >
              {isReadMore ? "Read more" : "Show less"}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export const getServerSideProps = async ({ params }) => {
  //console.log("pppp", params);
  const res = await axios.get(
    `${process.env.PUBLIC_URL}/api/products/${params.id}`
  );
  return {
    props: {
      game: res.data,
    },
  };
};

export default Product;
