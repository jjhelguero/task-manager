const API_KEY = process.env.RESEND_API
const Resend = require('resend')

const resend = new Resend(API_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'jjhelguero@protonmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});