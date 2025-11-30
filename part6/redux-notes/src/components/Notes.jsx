import { toggleImportanceOf } from "../reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";

const Notes = () => {
  const dispatch = useDispatch();
      const filter = useSelector((state)=>state.filter);

  // const notes = useSelector((state) => {
  //   if (state.filter === "ALL") {
  //     return state.notes;
  //   }
  //   return state.filter === "IMPORTANT"
  //     ? state.notes.filter((note) => note.important)
  //     : state.notes.filter((note) => !note.important);
  // });
 const notes = useSelector((state) => 
    filter === "ALL" ? state.notes : 
    filter === "IMPORTANT" ? state.notes.filter(note=>note.important):
    state.notes.filter(note=>!note.important)
  );
  return (
    <>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleImportanceOf(note.id))}
          >
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notes;
