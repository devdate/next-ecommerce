import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import Image from "next/image";
import promo1 from "../../../public/images/promotion-banner/promo1.jpg";
import promo2 from "../../../public/images/promotion-banner/promo2.jpg";
import { BannerContainerPromotion, PromoBannerEach } from "../../styles/banner";

export default function PromotionBanner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const items = [
    {
      name: "Random Name #1",
      description: "Save 15% on PS5 Games",
      src: promo1,
      align: "left",
    },
    {
      name: "Random Name #2",
      description: "Save 10% on PC Games",
      src: promo2,
      align: "right",
    },
  ];

  return (
    <BannerContainerPromotion container>
      {items.map((item, i) => (
        <Item key={i} item={item} theme={theme} />
      ))}
    </BannerContainerPromotion>
  );
}

const Item = (props) => {
  return (
    <PromoBannerEach
      item
      xs={12}
      sm={6}
      sx={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Typography
        variant="h4"
        width="100%"
        maxWidth="705px"
        align={props.item.align}
        color="white"
        sx={{
          position: "absolute",
          left: "0%",
          top: "20%",
          paddingLeft: props.item.align === "left" ? "20px" : "0px",
          paddingRight: props.item.align === "left" ? "0px" : "20px",
          zIndex: 1,
        }}
      >
        {props.item.description}
      </Typography>
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Image
          src={props.item.src}
          alt="any"
          fill
          style={{
            objectFit: "cover",
          }}
        ></Image>
      </Box>
    </PromoBannerEach>
  );
};
