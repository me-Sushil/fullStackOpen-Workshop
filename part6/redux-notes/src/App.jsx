import NoteForm from "./components/NoteForm";
import { toggleImportanceOf } from "./reducers/noteReducer";
import { useSelector, useDispatch } from 'react-redux' 

function App() {
 const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return (
    <>
    <NoteForm/>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleImportanceOf(note.id))}
          >
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
