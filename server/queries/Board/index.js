const Database = require("../../Database");
const uuid = require('uuid')

const createNewBoard = async (req, res) => {
  const id = uuid();
  Database.board_provider.insert({
    id: id,
    name: "Новая доска",
    owner: "uuid хозяина",
    public: true
  });

  res.json({
    status: 200,
    message: `Доска ${id} успешно создана`,
    newBoardId: id
  });
};

module.exports = {
  createNewBoard
};
