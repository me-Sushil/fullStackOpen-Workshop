import { useState } from "react";
import Note from "./component/Note";

const App=(props)=>{

  const [notes, setNotes]= useState(props.notes);
  const [newnote, setNewNote] = useState("");
  const [showAll, setShowALl] = useState(true);
  function handleSubmit(event){
    event.preventDefault();
    console.log("form submit", event.target);
     const newObj = {
      id:notes.length+1,
      note:newnote,
      important: Math.random() > 0.5
    }
    setNotes(notes.concat(newObj));
    setNewNote("");
  }

  function handleInput(event){
    setNewNote(event.target.value);
    
 } 
 const showAllVariable = showAll ? notes : notes.filter((note)=>{return note.important===true}); 

const handleShowFilter=()=>{
  setShowALl(!showAll);
}

  return (
    <>
    <h1>My Notes</h1>
    <button onClick={handleShowFilter}>Show {showAll?"important":"all"}</button>
    <ul>
    {showAllVariable.map((note)=>
    <Note key={note.id} note={note.note}/>
    )}
    </ul>
    <form onSubmit={handleSubmit}>
      <input  placeholder="Type here" value={newnote} onChange={handleInput}/>
      <button>submit</button>
    </form>
    </>
  )
}

export default App
