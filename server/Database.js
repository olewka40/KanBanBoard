const UserProvider = require("./Providers/UserProvider");
const TasksProvider = require("./Providers/TasksProvider");

class Database {
  constructor() {
    this.user_provider = new UserProvider();
    this.task_provider = new TasksProvider();
  }
}

module.exports = new Database();
