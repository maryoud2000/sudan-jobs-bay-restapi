const jwt = require("jsonwebtoken");
const User = require("./userModel");

exports.addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = await jwt.sign({ _id: newUser._id }, process.env.SECRET);
    res.status(200).send({ user: newUser.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.SECRET);
    res.status(200).send({ user: req.user.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const user = await User.find(
      {
        [req.body.filterKey]: req.body.filterVal,
      },
      "username email"
    );
    res.status(200).send({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { [req.body.filterKey]: req.body.filterVal },
      { [req.body.updateKey]: req.body.updateVal }
    );

    if (updatedUser.modifiedCount > 0) {
      res.status(200).send({ msg: "Successfully updated user" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updatedPassword = await User.updateOne(
      { username: req.user.username },
      { password: req.body.password }
    );

    if (updatedPassword.modifiedCount > 0) {
      res.status(200).send({ msg: "Successfully updated password" });
    } else {
      throw new Error("Did not update");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let result;
    if (req.user.username === req.params.username) {
      result = await User.deleteOne({
        username: req.user.username,
      });
    }
    if (result && result.deletedCount > 0) {
      res.status(200).send({ msg: `User has been deleted` });
    } else {
      throw new Error("User was not deleted");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ err: error.message });
  }
};