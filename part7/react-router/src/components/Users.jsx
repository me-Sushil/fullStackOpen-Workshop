import { useNavigate } from "react-router-dom";


const Users = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => navigate("/notes123")}>go to notes</button>
    </div>
  );
};

export default Users;
