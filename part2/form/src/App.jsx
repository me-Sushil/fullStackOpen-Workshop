import { useState, useEffect } from "react";
import Note from "./component/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import "./index.css";
import Notification from "./component/Notification";
import Footer from "./component/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newnote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("All good now...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
      console.log(initialNotes, "initialNotes");
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form submit", event.target);
    const newObj = {
      content: newnote,
      important: Math.random() > 0.5,
    };

    noteService.create(newObj).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = {
      ...note,
      important: !note.important,
      user: note.user.id || note.user,
    };

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
  };

  function handleInput(event) {
    setNewNote(event.target.value);
  }

  const showAllVariable = showAll
    ? Array.isArray(notes)
      ? notes
      : []
    : Array.isArray(notes)
    ? notes.filter((note) => note.important)
    : [];

  useEffect(() => {
    return function () {
      console.log("component is unmount");
    };
  }, []);

  const handleShowFilter = () => {
    setShowAll(!showAll);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
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
  );

  const noteForm = () => (
    <form onSubmit={handleSubmit}>
      <input value={newnote} onChange={handleInput} />
      <button type="submit">save</button>
    </form>
  );
  return (
    <>
      <h1>My Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
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
      <Footer />
    </>
  );
};

export default App;
