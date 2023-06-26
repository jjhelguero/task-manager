const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fd92cc3d0f903f",
    pass: "b46f467c7023de"
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
    from: "spammypants@protonmail.com",
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