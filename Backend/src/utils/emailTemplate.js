export const otpTemplate = (otp, name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Jobiffi Login OTP</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 0;
          border-radius: 8px;
          overflow: hidden; 
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #0033cc; /* <--- CHANGED to Light Grey */
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #ddd; /* Added a subtle border */
        }

        .content {
          padding: 30px;
          color: #333333;
          line-height: 1.6;
        }
        .greeting {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .otp-box {
          font-size: 36px;
          font-weight: bold;
          color: #0033cc;
          letter-spacing: 5px;
          background: #e6f0ff;
          padding: 15px;
          text-align: center;
          margin: 20px 0;
          border-radius: 8px;
          border: 1px dashed #0033cc;
        }
        .note {
          font-size: 14px;
          color: #cc0000;
          margin-top: 10px;
        }
        .app-links {
          margin-top: 20px;
          text-align: center;
        }
        .app-links img {
          height: 40px;
          margin: 0 5px;
          cursor: pointer;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          font-size: 11px;
          color: #777777;
          border-top: 1px solid #eeeeee;
          line-height: 1.5;
        }
        .footer a {
          color: #0033cc;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <a href="#" style="font-size: 28px; font-weight: bold; color: #ffffff !important; text-decoration: none; display: inline-block;">Jobiffi</a>
        </div>

        <div class="content">
          <div class="greeting">Dear ${name || "Jobseeker"},</div>
          
          <p>Please enter the OTP below to login to your Jobiffi account.</p>
          
          <div class="otp-box">${otp}</div>
          
          <p class="note"><strong>Note:</strong> This OTP is valid for the next 15 minutes only.</p>
          
          <p>If you did not make this request, please write to us at <a href="mailto:support@jobiffi.com">support@jobiffi.com</a>.</p>
          
          <br/>
          <p>Regards,<br><strong>Jobiffi Team</strong></p>
          <p>Good luck for your Job Search!</p>

          <div class="app-links">
            <p style="font-size: 14px; color: #555;">Enjoy personalized job searching experience</p>
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/320px-Download_on_the_App_Store_Badge.svg.png" alt="Download on App Store">
            </a>
            
            <a href="#">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/320px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play">
            </a>
          </div>
        </div>

        <div class="footer">
          <p><a href="#">Report a problem</a></p>
          <p>You have received this mail because your e-mail ID is registered with Jobiffi.com. This is a system-generated e-mail regarding your Jobiffi account preferences, please don't reply to this message.</p>
          
          <p>The jobs sent in this mail have been posted by the clients of Jobiffi.com. We have enabled auto-login for your convenience; you are strongly advised not to forward this email to protect your account from unauthorized access.</p>
          
          <p>Jobiffi has taken all reasonable steps to ensure that the information in this mailer is authentic. Users are advised to research bonafides of advertisers independently. <strong>Please do not pay any money to anyone who promises to find you a job.</strong></p>
          
          <p>Jobiffi shall not have any responsibility in this regard. We recommend that you visit our <a href="#">Terms and conditions</a> and the <a href="#">Security Advice</a> for more comprehensive information.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const verificationSuccessTemplate = (companyName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Jobiffi Email Verification Success</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {    
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 0;
          border-radius: 8px;
          overflow: hidden; 
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #0033cc; /* <--- CHANGED to Light Grey */
          padding: 20px;
          text-align: center;
          border-bottom: 1px solid #ddd; /* Added a subtle border */
        }
        .content {
          padding: 30px;
          color: #333333;
          line-height: 1.6;
        }
        .greeting {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .success-message {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 20px;
          font-size: 11px;
          color: #777777;
          border-top: 1px solid #eeeeee;
          line-height: 1.5;
        }
        .footer a {
          color: #0033cc;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <a href="#" style="font-size: 28px; font-weight: bold; color: #ffffff !important; text-decoration: none; display: inline-block;">Jobiffi</a>
        </div>
        <div class="content">
          <div class="greeting">Dear ${companyName},</div>
          <p class="success-message">Thank you for verifying your email address. Your email has been successfully verified.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
