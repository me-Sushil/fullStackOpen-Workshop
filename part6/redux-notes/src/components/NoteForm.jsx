import { useDispatch } from "react-redux";
import { addAllNotes } from "../reducers/noteReducer";
import { postNewNote } from "../services/notes";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    postNewNote(content).then((data) => dispatch(addAllNotes(data)));
  };

  return (
    <>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </>
  );
};
export default NoteForm;
