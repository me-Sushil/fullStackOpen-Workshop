import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createNote, updateNotes } from "./services/requests";

const App = () => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getAll,
  });

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNotes,
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  console.log(result, " this is query data");
  if (result.isLoading) {
    return <div>loading data...</div>;
  }
  const notes = result.data;

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    console.log(content);
    newNoteMutation.mutate({ content, important: true });
  };

  const toggleImportance = (note) => {
    console.log("toggle importance of", note.id);
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  //   const notes = [];

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : "not important"}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
