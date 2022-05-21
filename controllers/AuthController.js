const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    const user = await newUser.save();
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Something Wrong");
    }
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const token = jwt.sign({ userId: user.id }, "jwtSecret");
        res.header("x-user-token", token);
        res.status(200).send({ user, message: "success" });
      } else {
        
        res.status(400).send({ message: "Email Or Password Wrong!" });
      }
    } else {

      res.status(400).send({ message: "Email Or Password Wrong!" });
    }
  } catch (err) {
    
    res.status(400).send({ message: "Server Error" });
  }
};

module.exports = {
  register,
  login,
};
