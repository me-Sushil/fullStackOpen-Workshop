import { useState, useEffect } from "react";
import Note from "./component/Note";

const App=()=>{

  const [notes, setNotes]= useState([]);
  const [newnote, setNewNote] = useState("");
  const [showAll, setShowALl] = useState(true);

  useEffect(()=>{
    
  },[])

  // // useEffect Case 1  run every render
  // useEffect(()=>{
  //   console.log("run in every render")
  // })

  // // useEffect Case 2  run first render
  // useEffect(()=>{
  //   console.log("run first render")
  // },[]);

  // // useEffect Case 3  run when state change
  // useEffect(()=>{
  //   console.log("run when state shange")
  // },[notes]) 

  

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


    // useEffect case 4 run when component unmount
  useEffect(()=>{
    return function(){
    console.log("component is unmount");
}},[showAllVariable])


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
