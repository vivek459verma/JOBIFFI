import dotenv from "dotenv";
dotenv.config();

// Helper to safely get environment variables for images
const getAssetUrl = (key, fallback) => {
  const url = process.env[key] || fallback;
  return url.replace(/['"]/g, "").trim();
};

export const otpTemplate = (otp, name) => {
  const logoUrl = getAssetUrl('EMAIL_LOGO_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984351/android-chrome-512x512_etyldn.png');
  const playstoreBadge = getAssetUrl('PLAYSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984249/Picture1_yyvmqs.png');
  const appstoreBadge = getAssetUrl('APPSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1771130247/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917_dx9zt7.png');

  console.log(`📧 Generating OTP template... Assets: Logo=${logoUrl.substring(0, 40)}..., PlayStore=${playstoreBadge.substring(0, 40)}...`);

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Jobiffi OTP</title>
  <style type="text/css">
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .badge-row td { display: block !important; width: 100% !important; padding: 10px 0 !important; text-align: center !important; }
      .badge-img { width: 135px !important; height: auto !important; max-width: 135px !important; margin: 0 auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px;">
          
          <!-- HEADER SECTION -->
          <tr>
            <td align="center" style="background-color: #0025cc; padding: 30px 20px; border-radius: 8px 8px 0 0;">
              <a href="https://jobiffi.com" style="text-decoration: none;">
                <img src="${logoUrl}" alt="Jobiffi" width="60" style="height: 60px; width: 60px; display: block; margin: 0 auto 10px auto; border: 0;" />
                <div style="font-size: 24px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif; text-align: center;">Jobiffi</div>
              </a>
            </td>
          </tr>
          
          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 15px;">
                    Dear ${name || "Jobseeker"},
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 25px;">
                    Please enter the OTP below to proceed with your request on <strong>Jobiffi</strong>.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0 30px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="background-color: #e6f0ff; border: 1px dashed #0025cc; border-radius: 8px; padding: 15px 30px;">
                          <span style="font-family: Arial, Helvetica, sans-serif; font-size: 32px; font-weight: bold; color: #0025cc; letter-spacing: 5px;">
                            ${otp}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; color: #cc0000; padding-bottom: 20px;">
                    <strong>Note:</strong> This OTP is valid for the next 15 minutes only.
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-top: 20px;">
                    Regards,<br/>
                    <strong>Jobiffi Team</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- SEPARATOR -->
          <tr>
            <td style="padding: 0 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #eeeeee; padding: 0;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- APP DOWNLOAD SECTION -->
          <tr>
            <td align="center" style="padding: 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #666666; padding-bottom: 20px;">
                    Get the Jobiffi App
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr class="badge-row">
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://play.google.com/store/apps/details?id=com.jobiffi" target="_blank">
                            <img src="${playstoreBadge}" alt="Google Play" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://apps.apple.com/app/jobiffi" target="_blank">
                            <img src="${appstoreBadge}" alt="App Store" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- FOOTER SECTION -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; color: #0025cc; padding-bottom: 20px;">
                    <a href="https://jobiffi.com/report" style="color: #0025cc; text-decoration: none; font-weight: bold;">Report a problem</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 15px;">
                    You have received this mail because your e-mail ID is registered with Jobiffi.com. This is a system-generated e-mail regarding your account preferences. Please do not reply to this message.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px dotted #cccccc; padding: 0; line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-top: 15px; padding-bottom: 15px;">
                    Jobiffi has taken all reasonable steps to ensure the authenticity of information in this mailer. Users are advised to research the bonafides of advertisers independently. <strong style="color: #333333;">Please do not pay any money to anyone who promises to find you a job.</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 20px;">
                    We recommend that you visit our <a href="https://jobiffi.com/terms" style="color: #0025cc; text-decoration: none;">Terms and Conditions</a> and <a href="https://jobiffi.com/security" style="color: #0025cc; text-decoration: none;">Security Advice</a> for more information.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
                    <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #999999;">© 2026 Jobiffi. All rights reserved.</span><br/>
                    <div style="padding-top: 10px;">
                      <a href="https://jobiffi.com/privacy" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Privacy Policy</a>
                      <span style="color: #999999;">|</span>
                      <a href="https://jobiffi.com/terms" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Terms of Service</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const resetPasswordTemplate = (link, name) => {
  const logoUrl = getAssetUrl('EMAIL_LOGO_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984351/android-chrome-512x512_etyldn.png');
  const playstoreBadge = getAssetUrl('PLAYSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984249/Picture1_yyvmqs.png');
  const appstoreBadge = getAssetUrl('APPSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1771130247/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917_dx9zt7.png');

  console.log(`📧 Generating Reset Template... Assets: Logo=${logoUrl.substring(0, 40)}..., PlayStore=${playstoreBadge.substring(0, 40)}...`);

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Jobiffi Password</title>
  <style type="text/css">
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .badge-row td { display: block !important; width: 100% !important; padding: 10px 0 !important; text-align: center !important; }
      .badge-img { width: 135px !important; height: auto !important; max-width: 135px !important; margin: 0 auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px;">
          
          <!-- HEADER SECTION -->
          <tr>
            <td align="center" style="background-color: #0025cc; padding: 30px 20px; border-radius: 8px 8px 0 0;">
              <a href="https://jobiffi.com" style="text-decoration: none;">
                <img src="${logoUrl}" alt="Jobiffi" width="60" style="height: 60px; width: 60px; display: block; margin: 0 auto 10px auto; border: 0;" />
                <div style="font-size: 24px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif; text-align: center;">Jobiffi</div>
              </a>
            </td>
          </tr>
          
          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 15px;">
                    Dear ${name || "Jobseeker"},
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 25px;">
                    We received a request to reset your password for your <strong>Jobiffi</strong> account. Please click the button below to proceed.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0 30px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 6px; background-color: #0025cc;">
                          <a href="${link}" target="_blank" style="font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 14px 40px; border: 1px solid #0025cc; display: inline-block; font-weight: bold;">
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 20px; color: #666666; padding-bottom: 20px;">
                    Link valid for 15 minutes. Or copy this link: <br/> ${link}
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-top: 20px;">
                    Regards,<br/>
                    <strong>Jobiffi Team</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- SEPARATOR -->
          <tr>
            <td style="padding: 0 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #eeeeee; padding: 0;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- APP DOWNLOAD SECTION -->
          <tr>
            <td align="center" style="padding: 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #666666; padding-bottom: 20px;">
                    Get the Jobiffi App
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr class="badge-row">
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://play.google.com/store/apps/details?id=com.jobiffi" target="_blank">
                            <img src="${playstoreBadge}" alt="Google Play" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://apps.apple.com/app/jobiffi" target="_blank">
                            <img src="${appstoreBadge}" alt="App Store" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- FOOTER SECTION -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; color: #0025cc; padding-bottom: 20px;">
                    <a href="https://jobiffi.com/report" style="color: #0025cc; text-decoration: none; font-weight: bold;">Report a problem</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 15px;">
                    You have received this mail because your e-mail ID is registered with Jobiffi.com. This is a system-generated e-mail regarding your account preferences. Please do not reply to this message.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px dotted #cccccc; padding: 0; line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-top: 15px; padding-bottom: 15px;">
                    Jobiffi has taken all reasonable steps to ensure the authenticity of information in this mailer. Users are advised to research the bonafides of advertisers independently. <strong style="color: #333333;">Please do not pay any money to anyone who promises to find you a job.</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 20px;">
                    We recommend that you visit our <a href="https://jobiffi.com/terms" style="color: #0025cc; text-decoration: none;">Terms and Conditions</a> and <a href="https://jobiffi.com/security" style="color: #0025cc; text-decoration: none;">Security Advice</a> for more information.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
                    <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #999999;">© 2026 Jobiffi. All rights reserved.</span><br/>
                    <div style="padding-top: 10px;">
                      <a href="https://jobiffi.com/privacy" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Privacy Policy</a>
                      <span style="color: #999999;">|</span>
                      <a href="https://jobiffi.com/terms" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Terms of Service</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const verificationTemplate = (link) => {
  const logoUrl = getAssetUrl('EMAIL_LOGO_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984351/android-chrome-512x512_etyldn.png');
  const playstoreBadge = getAssetUrl('PLAYSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1770984249/Picture1_yyvmqs.png');
  const appstoreBadge = getAssetUrl('APPSTORE_BADGE_URL', 'https://res.cloudinary.com/drkakxopk/image/upload/v1771130247/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917_dx9zt7.png');

  console.log(`📧 Generating Verification Template... Assets: Logo=${logoUrl.substring(0, 40)}..., PlayStore=${playstoreBadge.substring(0, 40)}...`);

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Jobiffi Account</title>
  <style type="text/css">
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .badge-row td { display: block !important; width: 100% !important; padding: 10px 0 !important; text-align: center !important; }
      .badge-img { width: 135px !important; height: auto !important; max-width: 135px !important; margin: 0 auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px;">
          
          <!-- HEADER SECTION -->
          <tr>
            <td align="center" style="background-color: #0025cc; padding: 30px 20px; border-radius: 8px 8px 0 0;">
              <a href="https://jobiffi.com" style="text-decoration: none;">
                <img src="${logoUrl}" alt="Jobiffi" width="60" style="height: 60px; width: 60px; display: block; margin: 0 auto 10px auto; border: 0;" />
                <div style="font-size: 24px; font-weight: bold; color: #ffffff; font-family: Arial, Helvetica, sans-serif; text-align: center;">Jobiffi</div>
              </a>
            </td>
          </tr>
          
          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 15px;">
                    Dear Jobseeker,
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 25px;">
                    Thank you for registering with <strong>Jobiffi</strong>. Please verify your email to activate your account.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 20px 0 30px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 6px; background-color: #0025cc;">
                          <a href="${link}" target="_blank" style="font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 14px 40px; border: 1px solid #0025cc; display: inline-block; font-weight: bold;">
                            Verify My Account
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-top: 20px;">
                    Regards,<br/>
                    <strong>Jobiffi Team</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- SEPARATOR -->
          <tr>
            <td style="padding: 0 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #eeeeee; padding: 0;"></td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- APP DOWNLOAD SECTION -->
          <tr>
            <td align="center" style="padding: 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #666666; padding-bottom: 20px;">
                    Get the Jobiffi App
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr class="badge-row">
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://play.google.com/store/apps/details?id=com.jobiffi" target="_blank">
                            <img src="${playstoreBadge}" alt="Google Play" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://apps.apple.com/app/jobiffi" target="_blank">
                            <img src="${appstoreBadge}" alt="App Store" width="135" class="badge-img" style="display: block; border: 0;" />
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- FOOTER SECTION -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px; border-top: 1px solid #eeeeee; border-radius: 0 0 8px 8px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 20px; color: #0025cc; padding-bottom: 20px;">
                    <a href="https://jobiffi.com/report" style="color: #0025cc; text-decoration: none; font-weight: bold;">Report a problem</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 15px;">
                    You have received this mail because your e-mail ID is registered with Jobiffi.com. This is a system-generated e-mail regarding your account preferences. Please do not reply to this message.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px dotted #cccccc; padding: 0; line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-top: 15px; padding-bottom: 15px;">
                    Jobiffi has taken all reasonable steps to ensure the authenticity of information in this mailer. Users are advised to research the bonafides of advertisers independently. <strong style="color: #333333;">Please do not pay any money to anyone who promises to find you a job.</strong>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 20px;">
                    We recommend that you visit our <a href="https://jobiffi.com/terms" style="color: #0025cc; text-decoration: none;">Terms and Conditions</a> and <a href="https://jobiffi.com/security" style="color: #0025cc; text-decoration: none;">Security Advice</a> for more information.
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
                    <span style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #999999;">© 2026 Jobiffi. All rights reserved.</span><br/>
                    <div style="padding-top: 10px;">
                      <a href="https://jobiffi.com/privacy" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Privacy Policy</a>
                      <span style="color: #999999;">|</span>
                      <a href="https://jobiffi.com/terms" style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: #0025cc; text-decoration: none; margin: 0 5px;">Terms of Service</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const verificationSuccessTemplate = (companyName) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Jobiffi Email Verification Success</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
        .header { background-color: #0025cc; padding: 20px; text-align: center; color: #ffffff; font-size: 28px; font-weight: bold; }
        .content { padding: 30px; color: #333333; line-height: 1.6; }
        .greeting { font-size: 18px; font-weight: bold; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Jobiffi</div>
        <div class="content">
          <div class="greeting">Dear ${companyName},</div>
          <p>Your email has been successfully verified. You can now login to your account.</p>
        </div>
      </div>
    </body>
    </html>`;
};
