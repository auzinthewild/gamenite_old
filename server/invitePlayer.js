const nodemailer = require("nodemailer");

const sendMail = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "austin.bodin@gmail.com",
      pass: "srlctxcwintqglog",
    },
  });

  let mailOptions = {
    from: "austin.bodin@gmail.com",
    to: "austin.bodin@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendMail;
