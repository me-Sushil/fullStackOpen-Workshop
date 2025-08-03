import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";

const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);
reactRoot.render(React.createElement(App));
