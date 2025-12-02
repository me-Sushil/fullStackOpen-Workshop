
import { Link } from "react-router-dom";
const Note = ({ note }) => (
  <div>
    <h2>Single Note</h2>
    
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
    
  </div>
)
export default Note;