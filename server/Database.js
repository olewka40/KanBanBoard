const BoardProvider = require("./Providers/BoardProvider");
const TaskProvider = require("./Providers/TaskProvider");
const UserProvider = require("./Providers/UserProvider");

class Database {
  constructor() {
    this.board_provider = new BoardProvider();
    this.task_provider = new TaskProvider();
    this.user_provider = new UserProvider();
  }
}

module.exports = new Database();
