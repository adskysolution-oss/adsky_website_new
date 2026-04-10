const { Resend } = require('resend');
const { getRequiredEnv } = require('./env');

let resendClient;

const getResendClient = () => {
  if (!resendClient) {
    resendClient = new Resend(getRequiredEnv('RESEND_API_KEY'));
  }

  return resendClient;
};

const sendEmail = async ({ to, subject, html }) => {
  const resend = getResendClient();
  const response = await resend.emails.send({
    from: getRequiredEnv('RESEND_FROM_EMAIL'),
    to,
    subject,
    html,
  });

  if (response.error) {
    throw new Error(response.error.message || 'Email delivery failed');
  }

  return response.data;
};

module.exports = { sendEmail };
