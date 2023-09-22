const nodemailer = require("nodemailer");
module.exports.sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "13nadagamal@gmail.com", // generated ethereal user
      pass: "password ", // generated ethereal password
    },
  });
  const info = await transporter.sendMail(
    {
      from: '"saraha" <13nadagamal@gmail.com>', // sender address
      to: option.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `
    <h1>email</h1>
    <p>${option.message}</p>
    <a href="http://localhost:3000/verify/${option.token}">verify</a>
    `, // html body
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
};
