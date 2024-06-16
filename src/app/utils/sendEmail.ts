import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'anamikaroyproma@gmail.com',
      pass: 'mpka xerv dpwa ndew',
    },
  });

  await transporter.sendMail({
    from: '"PH University 👻" <gandibroy11@gmail.com>', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten minutes!', // Subject line
    text: 'Hi! Reset your password!', // plain text body
    html, // html body
  });
};
