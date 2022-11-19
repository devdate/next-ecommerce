import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme, { darkTheme } from "../theme";
import { parseCookies } from "nookies";
import Cookies from "js-cookie";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const CartContext = React.createContext({
  addItemtoCart: () => {},
  removeItemfromCart: () => {},
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
  const [mode, setMode] = React.useState("light");
  console.log(initialMode);
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
        setUser(null);
        setToken(null);
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
      addItemtoCart: (item) => {
        setTotalQuantity((prevTotal) => prevTotal + 1);
        setTotalPrice((prevTotal) => prevTotal + item.prices[0]);
        setCart((prevCart) => {
          let exists = false;
          const newCart = prevCart.map((eachItem) => {
            if (eachItem._id === item._id) {
              exists = true;
              return { ...eachItem, quantity: eachItem.quantity + 1 };
            }
            return { ...eachItem };
          });
          return exists ? newCart : [...prevCart, { ...item, quantity: 1 }];
        });
      },
      removeItemfromCart: (item) => {
        setTotalQuantity((prevTotal) => prevTotal - 1);
        setTotalPrice((prevTotal) => prevTotal - item.prices[0]);
        setCart((prevCart) => {
          const reducedCart = prevCart.map((eachItem) =>
            eachItem._id === item._id
              ? { ...eachItem, quantity: eachItem.quantity - 1 }
              : { ...eachItem }
          );
          const removedCart = reducedCart.filter(
            (eachItem) => eachItem.quantity !== 0
          );
          return removedCart;
        });
      },
      cart,
      totalQuantity,
      totalPrice,
    }),
    [cart, totalQuantity, totalPrice]
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
          <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
            {props.children}
          </ThemeProvider>
        </CartContext.Provider>
      </UserContext.Provider>
    </ColorModeContext.Provider>
  );
};

export async function getServerSideProps(ctx) {
  const cookie = parseCookies(ctx);
  const token = cookie.token;
  const user = cookie.user;
  console.log("trest", token);

  return {
    props: {
      token,
      user,
    },
  };
}

export default ColorModeContext;
