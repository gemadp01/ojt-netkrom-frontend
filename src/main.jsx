import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { reducers } from "@/store/store";

const globalStore = legacy_createStore(reducers);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={globalStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
