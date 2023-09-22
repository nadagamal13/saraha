const joi = require("joi");
const userSchema = joi.object({
  name: joi.string().min(2).max(20),
  email: joi.string().email().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  repeat_password: joi.ref("password"),
});
module.exports.userValidate = (req, res, next) => {
  const msgArr = [];
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.map((msg) => {
      msgArr.push({ msg: msg.message });
    });
    res.json(msgArr);
  } else {
    next();
  }
};
// const methods = ["body", "params"];
// const schema = {
//   body: joi.object({
//     name: joi.string().min(2).max(20),
//     email: joi.string().email().required(),
//     password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
//     repeat_password: joi.ref("password"),
//   }),
//   params: joi.object({
//     id: joi.string().min(4).max(4),
//   }),
// };
// module.exports.userValidate = (req, res, next) => {
//   const msgArr = [];
//   methods.map((key) => {
//     const { error } = schema[key].validate(req[key], { abortEarly: false });
//     if (error) {
//       error.details.map((msg) => {
//         msgArr.push({ msg: msg.message });
//       });
//     }
//   });
//   if (msgArr.length > 0) {
//     res.json(msgArr);
//   } else {
//     next();
//   }
// };
