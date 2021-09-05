const Database = require("../../Database");


const tryAuthorizationUser = async (req, res) => {
  const { userName, userPassword } = req.params;
  if (!userName || !userPassword) {
    res.sendStatus(401);
  } else {
    const user = await Database.user_provider.findOne({
      login: userName,
      password: userPassword
    });

    if (user) {
      res.cookie("userId", user._id);
      res.send({ status: 200 });
    } else {
      res.clearCookie("userId");
      res.sendStatus(401);
    }
  }
};
const registrationUser = async (req, res) => {
  if (
    await Database.user_provider.findOne({
      login: req.body.login
    })
  ) {
    console.log("Данный пользователь уже существует, попробуйте другой логин");
  } else {
    try {
      const { login, password, firstName, lastName, email } = req.body;

      Database.user_provider.insert({
        login,
        password,
        firstName,
        lastName,
        avatar: "/default_avatar.png",
        email
      });

      res.json({ status: 200 });
    } catch (err) {
      console.log(err);
      res.json({ stats: 404 });
    }
  }
};
const userLogout = (req, res) => {
  res.clearCookie("userId");
  res.send({ status: 200 });
};

module.exports = {
  userLogout,
  registrationUser,
  tryAuthorizationUser
};
