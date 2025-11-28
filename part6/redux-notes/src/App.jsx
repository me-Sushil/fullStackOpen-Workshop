import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

function App() {
  return (
    <>
      <NoteForm />
      <VisibilityFilter/>
      <Notes />
    </>
  );
}

export default App;
