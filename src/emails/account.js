const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "fd92cc3d0f903f",
    pass: "b46f467c7023de"
  }
});

const message = {
  from: "your_email_account@domain.com",
  to: "recipient_email_account@domain.com",
  subject: "Welcome!",
  text: "This is another email from nodemailer. "
}

transport.sendMail(message, (err, info) => {
if (err) {
 console.log(err)
} else {
 console.log(info);
}
});