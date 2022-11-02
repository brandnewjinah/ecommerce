import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import "./index.css";
import GlobalStyle from "./components/globalStyles";

//redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <RouterProvider router={Routes} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
