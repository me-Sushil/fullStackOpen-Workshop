import React from "react";
import ReactDOM from "react-dom/client";
import SayHello from "./SayHello";

const myRoot = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(myRoot);

reactRoot.render(React.createElement(SayHello));
