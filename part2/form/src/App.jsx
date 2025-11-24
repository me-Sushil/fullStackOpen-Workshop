import { useState, useEffect, useRef } from "react";
import Note from "./component/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import "./index.css";
import Notification from "./component/Notification";
import Footer from "./component/Footer";
import LoginForm from "./component/LoginForm";
import Togglable from "./component/Togglable";
import NoteForm from "./component/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("All good now...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
    });
  };

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
          setErrorMessage("All good now...");
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

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
        setErrorMessage("All good now...");
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Login Toggle">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  };

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    );
  };

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
          showAllVariable?.map((note) => (
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
