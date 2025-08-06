import Note from "./components/Note";

function App({ notes }) {
  return (
    <>
      <p>App component</p>
      <ul>
      {notes.map((note) => {
        return <Note key={note.id} note={note.content}/>
      })}
      </ul>
    </>
  );
}

export default App;
