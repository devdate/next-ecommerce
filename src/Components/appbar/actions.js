import {
  Divider,
  ListItemButton,
  ListItemIcon,
  Switch,
  useMediaQuery,
} from "@mui/material";
import {
  ActionIconsConatainerDesktop,
  ActionIconsConatainerMobile,
  MyList,
} from "../../styles/appbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import ColorModeContext from "../../context/ColorModeContext";
import CartIcon from "./cartIcon";

export default function Actions() {
  const ctx = useContext(ColorModeContext);
  const icons = [
    {
      id: "shop",
      element: <CartIcon />,
      helper: () => {},
    },
    { id: "account", element: <PersonIcon />, helper: () => {} },
  ];
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const CustomComponent = matches
    ? ActionIconsConatainerMobile
    : ActionIconsConatainerDesktop;

  //console.log(matches);

  const renderedIcons = icons.map((icon, index) => {
    return (
      <>
        <ListItemButton
          key={icon.id}
          onClick={icon.helper}
          disableRipple
          color="secondary"
          sx={{
            justifyContent: "center",
          }}
        >
          <ListItemIcon
            color="secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {icon.element}
          </ListItemIcon>
        </ListItemButton>
        <Divider orientation="vertical" flexItem />
      </>
    );
  });

  //console.log(icons);

  return (
    <ActionIconsConatainerDesktop>
      <MyList type="row">{renderedIcons}</MyList>
    </ActionIconsConatainerDesktop>
  );
}
