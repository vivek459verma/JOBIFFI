export const verificationTemplate = (verificationLink) => {
  const logoUrl = process.env.EMAIL_LOGO_URL || 'https://jobiffi.com/assets/android-chrome-192x192.png';
  const playstoreBadge = process.env.PLAYSTORE_BADGE_URL || 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
  const appstoreBadge = process.env.APPSTORE_BADGE_URL || 'https://tools.applemediaservices.com/api/v2/badges/download_on_the_app_store/black/en-us';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    .header { background-color: #0033cc; padding: 20px; text-align: center; }
    .header img { max-width: 150px; height: auto; margin-bottom: 10px; }
    .header a { font-size: 28px; font-weight: bold; color: #ffffff !important; text-decoration: none; }
    .content { padding: 30px; color: #333333; line-height: 1.6; }
    .verify-button { 
      display: inline-block; padding: 14px 24px; background-color: #0033cc; 
      color: #ffffff !important; text-decoration: none; font-size: 16px; 
      font-weight: bold; border-radius: 6px; margin: 20px 0; 
    }
    /* Professional Footer Styles */
    .footer { background-color: #f9f9f9; padding: 25px; font-size: 12px; color: #666666; border-top: 1px solid #eeeeee; line-height: 1.8; }
    .footer a { color: #0033cc; text-decoration: none; font-weight: 500; }
    .disclaimer-box { margin-top: 15px; padding-top: 15px; border-top: 1px dashed #cccccc; }
    .warning-text { color: #333333; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${logoUrl}" alt="Jobiffi Logo">
      <a href="https://jobiffi.com">Jobiffi</a>
    </div>

    <div class="content">
      <p>Dear Jobseeker,</p>
      <p>Thank you for registering with <strong>Jobiffi</strong>. Please verify your email address to activate your account.</p>
      <div style="text-align:center;">
        <a href="${verificationLink}" class="verify-button">Verify Email</a>
      </div>
      <p>Regards,<br/><strong>Jobiffi Team</strong></p>
      
      <!-- App Download Links -->
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eeeeee;">
        <p style="font-size: 14px; color: #666666; margin-bottom: 15px;">Download our app:</p>
        <div style="display: inline-block; margin: 0 10px;">
          <a href="https://play.google.com/store/apps/details?id=com.jobiffi" style="text-decoration: none;">
            <img src="${playstoreBadge}" alt="Get it on Google Play" style="height: 50px; width: auto; display: block;">
          </a>
        </div>
        <div style="display: inline-block; margin: 0 10px;">
          <a href="https://apps.apple.com/app/jobiffi/id" style="text-decoration: none;">
            <img src="${appstoreBadge}" alt="Download on the App Store" style="height: 50px; width: auto; display: block;">
          </a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p><a href="https://jobiffi.com/report">Report a problem</a></p>
      
      <p>
        You have received this mail because your e-mail ID is registered with Jobiffi.com. 
        This is a system-generated e-mail regarding your account preferences. 
        Please do not reply to this message.
      </p>

      <div class="disclaimer-box">
        <p>
          Jobiffi has taken all reasonable steps to ensure the authenticity of information in this mailer. 
          Users are advised to research the bonafides of advertisers independently. 
          <span class="warning-text">Please do not pay any money to anyone who promises to find you a job.</span>
        </p>

        <p>
          We recommend that you visit our 
          <a href="https://jobiffi.com/terms">Terms and Conditions</a> and 
          <a href="https://jobiffi.com/security">Security Advice</a> for more information.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
};