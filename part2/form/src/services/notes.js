import axios from "axios";

const baseUrl = "/api/notes";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data.concat({ id: 1000, content: "this is fake", important: true });
};


const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
