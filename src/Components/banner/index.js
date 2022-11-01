import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import pubgBanner from "../../../assests/home-banner/41.jpg";
import otherBanner from "../../../assests/home-banner/42.jpg";
import { BannerContainer } from "../../styles/banner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const items = [
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
    <Carousel indicators={false} navButtonsAlwaysVisible interval={6000}>
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
        src={props.item.src}
        fill
        alt="banner"
        style={{ objectFit: "cover" }}
      ></Image>
    </BannerContainer>
  );
};
