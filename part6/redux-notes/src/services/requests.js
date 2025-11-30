import axios from "axios";
const baseUrl = "http://localhost:3001/notes";
export const getAll = () => axios.get(baseUrl).then((res) => res.data);
