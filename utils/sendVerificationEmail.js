import sendEmail from './sendEmail.js';

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/verified-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : <a href="${verifyEmail}">Verified email</a></p>`;

  return sendEmail({
    to: email,
    subject: 'Email confirmation',
    html: `<h4>Hello ${name}</h4>
    ${message}
    `,
  });
};

export default sendVerificationEmail;
