// import { createStore, combineReducers } from "redux";
import {configureStore } from "@reduxjs/toolkit"
import noteReducer from "./reducers/noteReducer"
import filterReducer from "./reducers/filterReducer";

 const store = configureStore({
  reducer:{
    notes: noteReducer,
  filter: filterReducer,
  }

  
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

// export const store = createStore(reducer);
})

export default store
