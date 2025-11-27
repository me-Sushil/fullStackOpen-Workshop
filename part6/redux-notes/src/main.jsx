import { createRoot } from "react-dom/client";
import "./index.css";
import noteReducer from "./reducers/noteReducer";
import { createStore } from "redux";


const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

function App() {
  return (
    <>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}
// createRoot(document.getElementById("root")).render(<App />);
const myRoot = createRoot(document.getElementById("root"));
function renderApp() {
  myRoot.render(<App />);
}
renderApp();
store.subscribe(renderApp); //every time store value change that time
// myRender function call and this will render the app
