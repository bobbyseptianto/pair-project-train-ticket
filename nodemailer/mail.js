const nodemailer = require('nodemailer');
const env = require('dotenv');


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
});

let mailOptions = {
  from: 'admtimemlg@gmail.com',
  to: 'destaodervon@gmail.com',
  subject: 'E-Ticket',
  text: 'Berikut adalah e-tiket anda'
};

function send() {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`sukses ${info.response}`);
  });
}

document.getElementById('sendMail').addEventListener('click', send());