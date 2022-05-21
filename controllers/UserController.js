const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).send(others);
    } else {
      res.status(400).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      const { password, ...others } = user._doc;
      await user.deleteOne({ id: user.id });
      res.status(200).send(others);
    } else {
      res.status(400).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const updateUserById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user) {
      const hashNewPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!hashNewPassword) {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        req.body.password = hashPassword;
      }

      user = await User.findByIdAndUpdate(
        {
          _id: user.id,
        },
        req.body,
        {
          new: true,
        }
      );

      res.status(200).send(user);
    } else {
      res.status(400).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  deleteUserById,
  getUserById,
  updateUserById,
};
