import axios from "axios";

const createNewBoard = async () => {
  const { data } = await axios.post("/api/createNewBoard");
  console.log(data);
  return data;
};

export { createNewBoard };
