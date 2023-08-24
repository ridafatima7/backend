// email.js

const nodemailer = require('nodemailer');

const sendEmail = (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'DisasterInformationCell@gmail.com',
      pass: 'wrdsaoptsuwzjikd'
    }
  });

  const mailOptions = {
    from: 'noreply@disasterinformation.com',
    to,
    subject,
    text
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent:', info.response);
        resolve(info.response);
      }
    });
  });
};

module.exports = sendEmail;
