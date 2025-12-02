import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "Most important methods of HTTP-protocol are GET and POST",
    important: true,
  },
];

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App notes={notes} />
  </BrowserRouter>
);
