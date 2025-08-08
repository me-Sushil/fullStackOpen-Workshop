import Note from "./component/Note";

const App=({notes})=>{

  function handleSubmit(event){
    event.preventDefault();
    console.log("form submit", event.target);
  }

  return (
    <>
    <h1>My Notes</h1>
    <ul>
    {notes.map((note)=>
    <Note key={note.id} note={note.note}/>
    )}
    </ul>
    <form onSubmit={handleSubmit}>
      <input />
      <button>submit</button>
    </form>
    </>
  )
}

export default App
