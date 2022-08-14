const User = require("../model/userModel");
const brcypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Username already used", status: false });
    const hashedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect email or password", status: false });
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect email or password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.boy.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "userName",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {}
};
