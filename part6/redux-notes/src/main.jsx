import { createRoot } from "react-dom/client";
import "./index.css";
import noteReducer from "./reducers/noteReducer";
import { createStore } from "redux";

const store = createStore(noteReducer);
const generateId = () => Number((Math.random() * 1000000).toFixed(0));

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

const addNote = (event) => {
  event.preventDefault();
  const content = event.target.note.value;
  event.target.note.value = "";
  store.dispatch({
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  });
};
function App() {
  return (
    <>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li
            key={note.id}
            onClick={() => {
              store.dispatch({
                type: "TOGGLE_IMPORTANCE",
                payload: { id: note.id },
              });
            }}
          >
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
