import sgEmail from '@sendgrid/mail';
import config from '../../config/default.js';

const { sendgrid, verifiedSendgridEmail } = config;

sgEmail.setApiKey(sendgrid);

const sendEmail = async (emailContent, recipientAddress) => {
  try {
    const msg = {
      to: recipientAddress,
      from: verifiedSendgridEmail,
      subject: emailContent.subject,
      text: emailContent.body,
      html: emailContent.body,
    };

    await sgEmail.send(msg);
  } catch (err) {
    throw new Error(err);
  }
};

export const sendConfirmationEmail = async (recipient) => {
  try {
    const messageBody = `
    <div>
        <h3>Dear ${recipient.fullName}, your account has been created with the user of name ${recipient.username}</h3>
        <a href="confirmation/${recipient.id}">confirm</a>
        </div>`;

    const emailContent = {
      body: messageBody,
      subject: 'Account Confirmation',
    };

    await sendEmail(emailContent, recipient.email);
  } catch (err) {
    throw new Error(err);
  }
};
