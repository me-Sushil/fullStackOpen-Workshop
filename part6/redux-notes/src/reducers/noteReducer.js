
const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default noteReducer;
