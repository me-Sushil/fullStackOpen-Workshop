import { useNavigate } from "react-router-dom";


const Users = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => navigate("/notes123")}>go to notes 123</button>
      <button onClick={() => navigate("/notes456")}>go to notes 456</button>

  </div>
  );
};

export default Users;
