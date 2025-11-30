import { useDispatch } from "react-redux";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { getAndAddAllNotes } from "./reducers/noteReducer";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // getAll().then((data) => dispatch(addAllNotes(data)));
    dispatch(getAndAddAllNotes());

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
