const nodemailer = require('nodemailer')

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'stdfire@meta.ua',
    pass: process.env.META_PASSWORD,
  },
}

const transporter = nodemailer.createTransport(config)

const sendEmail = (mail) => {
    mail.from = "stdfire@meta.ua"
    transporter.sendMail(mail)
        .then(() => console.log('mail sended'))
        .catch(err => console.log(err.message))
}

module.exports = sendEmail
