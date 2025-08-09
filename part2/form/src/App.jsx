import { useState } from "react";
import Note from "./component/Note";

const App=(props)=>{

  const [notes, setNotes]= useState(props.notes);
  const [newnote, setNewNote] = useState("type somthing");
  function handleSubmit(event){
    event.preventDefault();
    console.log("form submit", event.target);
     const newObj = {
      id:notes.length+1,
      note:newnote
    }
    setNotes(notes.concat(newObj));
    setNewNote("");
  }

  function handleInput(event){
    setNewNote(event.target.value);
    
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
      <input value={newnote} onChange={handleInput}/>
      <button>submit</button>
    </form>
    </>
  )
}

export default App
