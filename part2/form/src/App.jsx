import { useState, useEffect } from "react";
import Note from "./component/Note";
import noteService from "./services/notes";
import loginService from './services/login'
import "./index.css";
import Notification from "./component/Notification";
import Footer from "./component/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newnote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("All good now...");
const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
      console.log(initialNotes, "initialNotes");
    });
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   console.log("promise fulfilled");
    //   console.log(response.data);
    //   setNotes(response.data);
    // });
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
    // setNotes(notes.concat(newObj));

    noteService.create(newObj).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
    // axios.post("http://localhost:3001/notes", newObj).then((response) => {
    //   console.log(response.data);
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });
  }

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server ${error}`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });
  };

  function handleInput(event) {
    setNewNote(event.target.value);
  }
  // const showAllVariable = showAll
  //   ? notes
  //   : notes.filter((note) => {
  //       return note.important === true;
  //     });


      const showAllVariable = showAll
  ? Array.isArray(notes) ? notes : []
  : Array.isArray(notes) ? notes.filter((note) => note.important) : [];

  // useEffect case 4 run when component unmount
  useEffect(() => {
    return function () {
      console.log("component is unmount");
    };
  }, []);

  const handleShowFilter = () => {
    setShowAll(!showAll);
  };


  const handleLogin = async event => {
    event.preventDefault()
 try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }  }

  return (
    <>
      <h1>My Notes</h1>
      <Notification message={errorMessage} />
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      <button onClick={handleShowFilter}>
        Show {showAll ? "important" : "all"}
      </button>
      <ul>
       {Array.isArray(showAllVariable) &&
  showAllVariable.map((note) => (
    <Note
      key={note.id}
      note={note}
      toggleImportance={() => toggleImportanceOf(note.id)}
    />
))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input placeholder="Type here" value={newnote} onChange={handleInput} />
        <button>submit</button>
      </form>
       <Footer />
    </>
  );
};

export default App;
