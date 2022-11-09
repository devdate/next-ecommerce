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
import React, { useState } from "react";
import Image from "next/image";
import { Ps5Icon, WindowsIcon, XboxIcon } from "../../src/svgicons";

const Product = () => {
  const game = {
    id: 1,
    name: "Call Of Duty MW3",
    price: 200,
    image: "/images/products/codmw3.jpg",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  };

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const [gameVariant, setGameVariant] = useState(0);
  const changeGameVariant = (id) => {
    setGameVariant(id);
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Grid container p={6}>
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
              alt="any"
              fill
              style={{
                objectFit: "contain",
                borderRadius: "5%",
              }}
            ></Image>
          </Box>
          <Card sx={{ padding: "10px 30px", margin: "20px" }}>
            <Typography variant="h6">₹{game.price}</Typography>
          </Card>
        </Grid>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ position: "relative" }}
          marginTop={{ xs: 4, sm: 4, md: 0, lg: 0 }}
        >
          <Card sx={{ textAlign: "center", padding: "24px" }}>
            <Typography
              variant="h3"
              borderBottom={2}
              textAlign="center"
              marginBottom={4}
            >
              {game.name}
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
          <Card sx={{ padding: "24px", marginTop: "24px" }}>
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
              sx={{ display: "flex", flexWrap: "wrap" }}
            >
              <Tooltip title="PlayStation®5" placement="top">
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
                  <Ps5Icon viewBox="0 0 66 15" style={{ width: "85px" }} />
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
              <Tooltip title="Windows® 7/8.1/10/11" placement="top">
                <Button
                  variant={gameVariant == 2 ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => changeGameVariant(2)}
                  sx={{ flex: "1", minWidth: "130px", margin: "8px" }}
                >
                  <WindowsIcon viewBox="0 0 71 15" style={{ width: "85px" }} />
                </Button>
              </Tooltip>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Product;
