import nodemailer from 'nodemailer';
import nodemailerConfig from './nodemailerConfig.js';

import sgMail from '@sendgrid/mail';

const sendEmailEthereal = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Jeremy Polanco" <jeremyinf26@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

const sendEmail = async ({ to, subject, html }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'jeremyinf26@gmail.com', // Change to your verified sender
    subject,
    html,
  };
  const info = await sgMail.send(msg);
};

export default sendEmail;
