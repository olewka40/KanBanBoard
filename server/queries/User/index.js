const Database = require("../../Database");

const getUserInfo = async (req, res) => {
  const userid = req.cookies.userId;
  const userInfo = await Database.user_provider.find({
    _id: userid
  });

  res.json({
    userInfo: userInfo
  });
};
const getUsers = async (req, res) => {
  const users = await Database.user_provider.find();
  res.json({
    users
  });
};
const getUser = async (req, res) => {
  const userid = req.cookies.userId;
  const user = await Database.user_provider.findOne({ _id: userid });
  // TODO: УДАЛИТЬ ПАРОЛЬ ЮЗЕРА ПРИ ВЫДАЧЕ ЧЕРЕЗ АПИ
  res.json(user);
};

module.exports = {
  getUserInfo,
  getUser,
  getUsers
};
