import ReactDOM from "react-dom/client";
import React from "react";
import SayHello from "./SayHello";

const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);

const App=()=>{
 const myDiv = React.createElement("div", {}, [
React.createElement(SayHello, {name:"Sushil"}),
React.createElement(SayHello, {name:"sudesh"}),
React.createElement(SayHello, {name:"sugam"})
 ])
  return myDiv;
} 
reactRoot.render(React.createElement(App));