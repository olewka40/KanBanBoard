const Database = require("../../Database");
const CryptoJS = require("crypto-js");

const createNewUser = async (req, res) => {
  const { login, password } = req.body;
  const passHash = CryptoJS.SHA256(password);
  console.log(passHash);
  const user = await Database.user_provider.findOne({
    login
  });
  if (!user) {
    await Database.user_provider.insert({
      login: login,
      password: passHash
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
  const passHash = CryptoJS.SHA256(password);
  const user = await Database.user_provider.findOne({
    login
  });

  if (!user) {
    res.json({
      status: 200,
      success: false,
      message: `Неправильный логин или пароль. Возможно такого пользователя не существует.`
    });
  } else {
    if (
      JSON.stringify(user.password) === JSON.stringify(passHash) &&
      user.login === login
    ) {
      res.json({
        status: 201,
        message: `Вы вошли в систему`,
        success: true,
        user
      });
    }
  }
  if (
    user.login === login &&
    JSON.stringify(user.password) !== JSON.stringify(passHash)
  ) {
    res.json({
      status: 200,
      message: `Пароль неверный!`,
      success: false
    });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  const user = await Database.user_provider.findOne({ _id: userId });
  res.json({ success: true, user });
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
