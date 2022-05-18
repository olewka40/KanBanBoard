const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class BoardProvider {
  constructor() {
    this.boardDB = new Datastore({
      filename: `${PATH_TO_DB}/board.db`
    });

    this.boardDB.loadDatabase();
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.boardDB.find(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.boardDB.findOne(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async insert(board) {
    return new Promise((resolve, reject) => {
      this.boardDB.insert(board, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  async update(query, data, settings) {
    return new Promise((resolve, reject) => {
      this.boardDB.update(query, data, settings, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async remove(query) {
    return new Promise((resolve, reject) => {
      this.boardDB.remove(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  //
  // insert(board) {
  //   this.boardDB.insert(board);
  // }
}

module.exports = BoardProvider;
