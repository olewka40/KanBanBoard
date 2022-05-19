const Database = require("../../Database");

const createNewUser = async (req, res) => {
  const { login, password } = req.body;
  const user = await Database.user_provider.findOne({
    login
  });
  if (!user) {
    await Database.user_provider.insert({
      login: login,
      password: password
    });

    res.json({
      status: 201,
      message: `Пользователь успешно зарегистрирован`
    });
  } else {
    res.json({
      status: 200,
      message: `Пользователь с данным логином уже существует.`
    });
  }
};
const authorization = async (req, res) => {
  const { login, password } = req.params;
  const user = await Database.user_provider.findOne({
    login
  });
  if (!user) {
    res.json({
      status: 200,
      success: false,
      message: `Неправильный логин, пароль. Возможно такого пользователя не существует.`
    });
  } else {
    if (user.password === password && user.login === login) {
      res.json({
        status: 201,
        message: `Вы вошли в систему`,
        success: true,
        user
      });
    }
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await Database.user_provider.findOne({ _id: userId });
  res.json(user);
};
const getAllUsers = async (req, res) => {
  const usersDb = await Database.user_provider.find();
  const users = usersDb.map(user => ({ login: user.login, id: user._id }));
  res.json(users);
};

module.exports = {
  createNewUser,
  authorization,
  getAllUsers,
  getUserById
};
