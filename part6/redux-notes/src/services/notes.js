import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;

  // if (!response.ok) {
  //   throw new Error("Failed to fetch notes");
  // }
  //   const data = await response.json();
};

export { getAll };
