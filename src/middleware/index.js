const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const User = require("../user/userModel");
const saltRounds = parseInt(process.env.SALT_ROUNDS);

exports.hashPassword = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.decryptPassword = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    if (
      req.user &&
      (await bcrypt.compare(req.body.password, req.user.password))
    ) {
      next();
    } else {
      throw new Error("Incorrect credentials supplied");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.validateEmail = (req, res, next) => {
  try {
    let email;
    req.body.updateVal
      ? (email = req.body.updateVal)
      : (email = req.body.email);
    if (validator.validate(email)) {
      next();
    } else {
      throw new Error("email address is in incorrect format");
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.validateUsername = (req, res, next) => {
  try {
    if (req.body.username.match("^[A-Za-z0-9]+$")) {
      next();
    } else {
      throw new Error("Username can only contain letters and numbers");
    }
  } catch (error) {
    res.status(500).send({ err: error.message });
  }
};

exports.checkToken = async (req, res, next) => {
  try {
    const decodedToken = await jwt.verify(
      req.header("Authorization").replace("Bearer ", ""),
      process.env.SECRET
    );
    req.user = await User.findById(decodedToken._id);
    if (req.user) {
      next();
    } else {
      throw new Error("No user found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};