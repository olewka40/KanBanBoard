const Datastore = require("nedb");

const PATH_TO_DB = __dirname + "/../../db";

class UserProvider {
  constructor() {
    this.userDB = new Datastore({
      filename: `${PATH_TO_DB}/user.db`
    });

    this.userDB.loadDatabase();
  }

  async find(query) {
    return new Promise((resolve, reject) => {
      this.userDB.find(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  async findOne(query) {
    return new Promise((resolve, reject) => {
      this.userDB.findOne(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async update(query, data, settings) {
    return new Promise((resolve, reject) => {
      this.userDB.update(query, data, settings, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async removeAll(query, multi) {
    return new Promise((resolve, reject) => {
      this.userDB.remove(query, multi, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }
  async remove(query) {
    return new Promise((resolve, reject) => {
      this.userDB.remove(query, (err, data) => {
        // если ошибка тупо выходим
        if (err) return reject();

        // иначе возвращаем данные
        resolve(data);
      });
    });
  }

  insert(user) {
    this.userDB.insert(user);
  }
}

module.exports = UserProvider;
