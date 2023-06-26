const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD
  }
});

const sendMail = (message) => {
  transport.sendMail(message, (err, info) => {
    if (err) {
     console.log(err)
    } else {
     console.log(info);
    }
    });
}

const sendWelcomeEmail = (email, name) => {
  const message = {
    from: "spammypants@protonmail.com",
    to: email,
    subject: "Thanks for joining us",
    text: `Welcome to the app, ${name}`,
  }
  sendMail(message)
}

const sendCancelationEmail = (email, name) => {
  const message = {
    from: process.env.MAILTRAP_SENDER,
    to: email,
    subject: "We are sad to see you go",
    text: `Maybe this isn't good bye forever, ${name}`,
  }
  sendMail(message)
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}