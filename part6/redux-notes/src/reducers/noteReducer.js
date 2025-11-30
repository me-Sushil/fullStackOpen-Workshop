import { createSlice, current } from "@reduxjs/toolkit";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));
// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 3,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 4,
//   },
// ];

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      console.log("createNote action", action);
      console.log("createNote state", current(state));

      const content = action.payload;
      return state.concat({
        content,
        important: false,
        id: generateId(),
      });
    },
    addAllNotes(state, action) {
      return state.concat(action.payload);
    },

    toggleImportanceOf(state, action) {
      console.log("toggleImportance action", action);
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});
export const { createNote, toggleImportanceOf, addAllNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     //   return state.concat(action.payload);
//     case "TOGGLE_IMPORTANCE": {
//       const id = action.payload.id;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     }
//     default:
//       return state;
//   }
// };

// const createNote = (content) => {
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };
