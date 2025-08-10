import { useState, useEffect } from "react";
import Note from "./component/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newnote, setNewNote] = useState("");
  const [showAll, setShowALl] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setNotes(response.data);
    });
  }, []);

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form submit", event.target);
    const newObj = {
      //id: notes.length + 1,
      content: newnote,
      important: Math.random() > 0.5,
    };
    setNotes(notes.concat(newObj));
    axios.post("http://localhost:3001/notes", newObj).then((response) => {
      console.log(response.data);
      setNotes(notes.concat(response.data))
      setNewNote("");
    });
  }

  function handleInput(event) {
    setNewNote(event.target.value);
  }
  const showAllVariable = showAll
    ? notes
    : notes.filter((note) => {
        return note.important === true;
      });

  // useEffect case 4 run when component unmount
  useEffect(() => {
    return function () {
      console.log("component is unmount");
    };
  }, [showAllVariable]);

  const handleShowFilter = () => {
    setShowALl(!showAll);
  };

  return (
    <>
      <h1>My Notes</h1>
      <button onClick={handleShowFilter}>
        Show {showAll ? "important" : "all"}
      </button>
      <ul>
        {showAllVariable.map((note) => (
          <Note key={note.id} note={note.content} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input placeholder="Type here" value={newnote} onChange={handleInput} />
        <button>submit</button>
      </form>
    </>
  );
};

export default App;
