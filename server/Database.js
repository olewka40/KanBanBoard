const UserProvider = require("./Providers/UserProvider");
const BoardProvider = require("./Providers/BoardProvider");
const TaskProvider = require("./Providers/TaskProvider");

class Database {
  constructor() {
    this.user_provider = new UserProvider();
    this.board_provider = new BoardProvider();
    this.task_provider = new TaskProvider();
  }
}

module.exports = new Database();
