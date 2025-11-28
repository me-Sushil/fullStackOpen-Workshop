import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:"filter",
    initialState:"",
    reducers:{
        filterChange(state, action){
            const filter = action.payload;
            return filter;
        }
    }
})
// const filterReducer = (state = "ALL", action) => {
//   if (action.type === "SET_FILTER") {
//     return action.payload;
//   }
//   return state;
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };
export const {filterChange} = filterSlice.actions;
export default filterSlice.reducer;