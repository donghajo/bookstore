import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import App from "./App";
import { StateProvider } from "./store/StateProvider";
import reducer, { initialState } from "./store/reducer";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </QueryClientProvider>
);
