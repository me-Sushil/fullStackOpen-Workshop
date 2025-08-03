import ReactDOM from "react-dom/client";
import React from "react";
import SayHello from "./SayHello";

const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);

const App=()=>{
 const myDiv = React.createElement("div", {}, [
React.createElement(SayHello, {name:"Sushil"}),
React.createElement(SayHello, {name:"Sudesh"}),
React.createElement(SayHello, {name:"Sugam"})
 ])
  return myDiv;
} 
reactRoot.render(React.createElement(App));