import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import pubgBanner from "../../../public/images/home-banner/41.jpg";
import otherBanner from "../../../public/images/home-banner/42.jpg";
import gowBanner from "../../../public/images/home-banner/gow.jpg";
import { BannerContainer } from "../../styles/banner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const items = [
    {
      name: "God Of War Ragnarok",
      description: "Hello World!",
      src: gowBanner,
    },
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
      src: pubgBanner,
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
      src: otherBanner,
    },
  ];

  return (
    <Carousel
      height={matches ? "100vh" : "380px"}
      indicators={false}
      navButtonsAlwaysVisible
      interval={5000}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} matches={matches} />
      ))}
    </Carousel>
  );
}

const Item = (props) => {
  return (
    <BannerContainer>
      {/*any*/}
      <Image
        priority
        src={props.item.src}
        fill
        alt={props.item.description}
        style={{ objectFit: "cover" }}
      ></Image>
    </BannerContainer>
  );
};
