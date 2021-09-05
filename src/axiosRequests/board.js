import axios from "axios";

const createNewBoard = async () => {
  const { data } = await axios.post("/api/createNewBoard");
  return data;
};


export { createNewBoard };
