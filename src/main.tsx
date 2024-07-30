import { ChakraProvider } from "@chakra-ui/react";
// import React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";

import theme from "./theme";
import App from "./app";
import "./main.css"
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  // </React.StrictMode>
);
