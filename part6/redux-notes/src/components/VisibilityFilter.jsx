import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const filterSelected = (filter) => {
    console.log(filter);
    dispatch(filterChange(filter));
  };
  return (
    <>
      <div>
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("ALL")}
        />
        all
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("IMPORTANT")}
        />
        important
        <input
          type="radio"
          name="filter"
          onChange={() => filterSelected("NOT_IMPORTANT")}
        />
        not important
      </div>
    </>
  );
};

export default VisibilityFilter;
