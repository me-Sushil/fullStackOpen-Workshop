import ReactDOM from "react-dom/client";
import App from "./App";

const react = document.getElementById("root");
const reactRoot = ReactDOM.createRoot(react);
// this is special for main.jsx file  
reactRoot.render(<App />);
// this is special for main.js file  
//reactRoot.render(React.createElement(App));
