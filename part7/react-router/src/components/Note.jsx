// import { Link, useParams } from "react-router-dom";
const Note = ({ note }) => {
//   const id = useParams().id;
//   const myNote = notes.find((note) => note.id == id);
  return (
    <div>
      <h2>Single Note</h2>
      <div>{note.content}</div>
    </div>
  );
};
export default Note;
