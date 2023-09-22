const { userValidate } = require("../middleware/user.validation");
const { signup, signin, emailVerify } = require("../services/user.service");
const app = require("express").Router();
app.post("/signup", userValidate, signup);
app.post("/signin", signin);
app.get("/verify/:token", emailVerify);
module.exports = app;
