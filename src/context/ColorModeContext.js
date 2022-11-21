import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme, { darkTheme } from "../theme";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";
import axios from "axios";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const alertContext = React.createContext({
  closeAlertOpen: () => {},
  OpenAlert: () => {},
  alertOpen: false,
  alertData: {},
});

export const CartContext = React.createContext({
  addItemtoCart: () => {},
  removeItemfromCart: () => {},
  resetCart: () => {},
  setCart: () => {},
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
});

export const UserContext = React.createContext({
  setUserContext: () => {},
  removeUserContext: () => {},
  token: "",
  user: null,
});

const initialMode = parseCookies().mode;

export const ColorModeContextProvider = (props) => {
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertData, setAlertData] = React.useState({});
  const [mode, setMode] = React.useState("light");
  //console.log(initialMode);
  const [token, setToken] = React.useState(parseCookies().token);
  const [user, setUser] = React.useState(
    parseCookies().user ? JSON.parse(parseCookies().user) : null
  );

  useEffect(() => {
    if (initialMode === "dark") {
      setMode("dark");
    }
  }, []);

  const [cart, setCart] = React.useState([]);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const userValues = React.useMemo(
    () => ({
      setUserContext: (userToken, userInfo) => {
        setUser(userInfo);
        setToken(userToken);
        Cookies.set("token", userToken);
        Cookies.set("user", JSON.stringify(userInfo));
      },
      removeUserContext: () => {
        setToken(null);
        setUser(null);
        Cookies.remove("token");
        Cookies.remove("user");
      },
      token,
      user,
    }),
    [token, user]
  );

  const cartItems = React.useMemo(
    () => ({
      addItemtoCart: async (item, variant, authtoken) => {
        try {
          await axios.put(
            `${process.env.PUBLIC_URL}/api/cart`,
            {
              product: item,
              variant,
            },
            {
              headers: {
                Authorization: "Bearer " + authtoken,
              },
            }
          );
        } catch (err) {
          console.log(err);
          return err;
        }

        setTotalQuantity((prevTotal) => prevTotal + 1);
        setTotalPrice((prevTotal) => prevTotal + item.prices[variant]);
        setCart((prevCart) => {
          let exists = false;
          const newCart = prevCart.map((eachItem) => {
            if (eachItem._id === item._id && eachItem.variant === variant) {
              exists = true;
              return { ...eachItem, quantity: eachItem.quantity + 1 };
            }
            return { ...eachItem };
          });
          return exists
            ? newCart
            : [...prevCart, { ...item, quantity: 1, variant }];
        });
      },
      removeItemfromCart: (item, variant) => {
        setTotalQuantity((prevTotal) => prevTotal - 1);
        setTotalPrice((prevTotal) => prevTotal - item.prices[variant]);
        setCart((prevCart) => {
          const reducedCart = prevCart.map((eachItem) =>
            eachItem._id === item._id && eachItem.variant === variant
              ? { ...eachItem, quantity: eachItem.quantity - 1 }
              : { ...eachItem }
          );
          const removedCart = reducedCart.filter(
            (eachItem) => eachItem.quantity !== 0
          );
          return removedCart;
        });
      },
      resetCart: (viewCart, totalPrice, totalQuantity) => {
        //console.log(viewCart, totalQuantity, totalPrice);
        setCart([...viewCart]);
        setTotalQuantity(totalQuantity);
        setTotalPrice(totalPrice);
      },
      cart,
      totalQuantity,
      totalPrice,
    }),
    [cart, totalQuantity, totalPrice]
  );

  const toast = React.useMemo(
    () => ({
      closeAlertOpen: () => {
        setAlertOpen(false);
      },
      OpenAlert: () => {
        setAlertOpen(true);
      },
      alertOpen,
      alertData,
    }),
    [alertOpen]
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        Cookies.set("mode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <UserContext.Provider value={userValues}>
        <CartContext.Provider value={cartItems}>
          <alertContext.Provider value={toast}>
            <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
              {props.children}
            </ThemeProvider>
          </alertContext.Provider>
        </CartContext.Provider>
      </UserContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
