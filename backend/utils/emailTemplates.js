const buildPasswordResetEmail = ({ name, resetUrl, expiresInMinutes }) => {
  const safeName = name || 'there';

  return {
    subject: 'Reset your AD Sky Solution password',
    html: `
      <div style="margin:0;padding:32px 16px;background:#f4f8fd;font-family:Arial,sans-serif;color:#10213f;">
        <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #d9e2ef;">
          <div style="padding:28px 32px;background:linear-gradient(135deg,#081a34,#0a2d67);color:#ffffff;">
            <div style="font-size:28px;font-weight:800;letter-spacing:-0.03em;"><span style="color:#ff6b84;">AD</span> Sky Solution</div>
            <div style="margin-top:10px;font-size:14px;letter-spacing:0.16em;text-transform:uppercase;color:#cddcf8;">Secure Password Reset</div>
          </div>
          <div style="padding:32px;">
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">Hi ${safeName},</p>
            <p style="font-size:16px;line-height:1.7;margin:0 0 16px;">We received a request to reset your password. If you made this request, use the button below to set a new password.</p>
            <div style="margin:28px 0;">
              <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#d21f3c,#eb3655);color:#ffffff;text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:700;">Reset Password</a>
            </div>
            <p style="font-size:14px;line-height:1.7;color:#60708f;margin:0 0 16px;">This link will expire in ${expiresInMinutes} minutes. If you did not request a password reset, you can safely ignore this email.</p>
            <p style="font-size:13px;line-height:1.7;color:#60708f;margin:0;">If the button doesn&apos;t work, copy and paste this link into your browser:<br /><a href="${resetUrl}" style="color:#0a2d67;word-break:break-all;">${resetUrl}</a></p>
          </div>
        </div>
      </div>
    `,
  };
};

module.exports = { buildPasswordResetEmail };
