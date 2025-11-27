import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import "./index.css";

export const store = createStore(noteReducer);


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
// const myRoot = createRoot(document.getElementById("root"));
// function renderApp() {
//   myRoot.render(<App />);
// }
// renderApp();
// store.subscribe(renderApp); //every time store value change that time
// // myRender function call and this will render the app
