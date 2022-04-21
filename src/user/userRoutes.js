const { Router } = require("express");
const {
  addUser,
  loginUser,
  listUsers,
  updateUser,
  deleteUser,
  updatePassword,
  searchUser,
} = require("./userControllers");
const {
  hashPassword,
  decryptPassword,
  checkToken,
  validateEmail,
  validateUsername,
} = require("../middleware");
const userRouter = Router();

userRouter.post(
  "/user",
  validateUsername,
  validateEmail,
  hashPassword,
  addUser
);
// login with username and password
userRouter.post("/login", decryptPassword, loginUser);
// login with a jwt token
userRouter.get("/user", checkToken, loginUser);
userRouter.patch("/user", hashPassword, checkToken, updatePassword);
userRouter.put("/user", validateEmail, updateUser);
userRouter.delete("/user/:username", checkToken, deleteUser);
userRouter.post("/user/search", searchUser);
userRouter.get("/user/list", listUsers);

module.exports = userRouter;