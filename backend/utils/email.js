const nodemailer = require("nodemailer");

const sendEmail = (to, subject, userName, message, link) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "allinophopark512@gmail.com", // replace with email
      pass: "qzrtlhwnlropppjf", // replace with password
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: "SSLv3",
    },
  });

  let mailOptions = {
    from: '"Allinophopark" <allinophopark512@gmail.com>',
    to: to,
    subject: subject,
    html: `<p>Hello ${userName}. ${message}</p>
          <a href="${link}">Here is the Verification Link!</a>`,
  };

  mailOptions.headers = {
    'Content-Type': 'text/html'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
};

module.exports = sendEmail;
