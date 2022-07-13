import sgEmail from '@sendgrid/mail';
import config from '../../config/default.js';
import { generateConfirmationEmail } from './emailGenerator.js';

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
    const messageBody = generateConfirmationEmail(recipient);

    const emailContent = {
      body: messageBody,
      subject: 'Account Confirmation',
    };

    await sendEmail(emailContent, recipient.email);
  } catch (err) {
    throw new Error(err);
  }
};
