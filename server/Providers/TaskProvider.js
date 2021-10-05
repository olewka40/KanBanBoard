const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class TaskProvider {
  constructor() {
    this.taskDB = new Datastore({
      filename: `${PATH_TO_DB}/task.db`
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
  async update(query, data, settings) {
    return new Promise((resolve, reject) => {
      this.taskDB.update(query, data, settings, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async remove(query) {
    return new Promise((resolve, reject) => {
      this.taskDB.remove(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  insert(task) {
    this.taskDB.insert(task);
  }
}

module.exports = TaskProvider;
