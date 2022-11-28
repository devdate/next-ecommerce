import { Brightness1 } from "@mui/icons-material";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductListView({ eachItem }) {
  return (
    <Link href={`/product/${eachItem._id}`}>
      <Card
        key={`${eachItem._id}${eachItem.variant}`}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          marginTop: "8px",
          marginBottom: "8px",
          cursor: "pointer",
          "&:hover": {
            filter: "brightness(80%)",
          },
        }}
      >
        <CardMedia
          key={eachItem._id}
          alt={eachItem.name}
          sx={{ height: "100%", width: "60px", height: "80px" }}
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
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            position: "relative",
            height: "60px",
          }}
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
          </Box>
          <Box
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginLeft: "15px",
              marginRight: "35px",
              width: "calc(100% - 50px)",
              position: "absolute",
              bottom: 0,
            }}
          >
            <Typography noWrap variant="subtitle2" textAlign="left">
              {eachItem.description}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Link>
  );
}

export default ProductListView;
