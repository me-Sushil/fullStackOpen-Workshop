import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Home from "./components/Home";
import Notes from "./components/Notes";
import Users from "./components/Users";
import Note from "./components/Note";

const App = ({ notes }) => {
  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");

  const note = match ? notes.find((note) => note.id == match.params.id) : null;
  return (
    <>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
        <Route path="/notes123" element={<Notes notes={notes} />} />
        <Route path="/notes456" element={<Navigate replace to="/notes" />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </>
  );
};

export default App;
