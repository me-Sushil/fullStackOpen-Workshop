import { useDispatch } from "react-redux";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { getAll } from "./services/notes";
import { addAllNotes } from "./reducers/noteReducer";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAll().then((data) => dispatch(addAllNotes(data)));
  }, []);
  return (
    <>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </>
  );
}

export default App;
