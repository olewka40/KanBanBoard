const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class BoardProvider {
  constructor() {
    this.taskDB = new Datastore({
      filename: `${PATH_TO_DB}/board.db`
    });

    this.taskDB.loadDatabase();
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.taskDB.find(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.taskDB.findOne(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  insert(board) {
    this.taskDB.insert(board);
  }
}

module.exports = BoardProvider;
