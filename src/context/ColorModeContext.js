import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import lightTheme, { darkTheme } from "../theme";

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

export const ColorModeContextProvider = (props) => {
  const [mode, setMode] = React.useState("light");

  const [cart, setCart] = React.useState([]);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  const cartItems = React.useMemo(
    () => ({
      addItemtoCart: (item) => {
        setTotalQuantity((prevTotal) => prevTotal + 1);
        setTotalPrice((prevTotal) => prevTotal + item.price);
        setCart((prevCart) => {
          let exists = false;
          const newCart = prevCart.map((eachItem) => {
            if (eachItem.id === item.id) {
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
        setTotalPrice((prevTotal) => prevTotal - item.price);
        setCart((prevCart) => {
          const reducedCart = prevCart.map((eachItem) =>
            eachItem.id === item.id
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
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CartContext.Provider value={cartItems}>
        <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
          {props.children}
        </ThemeProvider>
      </CartContext.Provider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeContext;
