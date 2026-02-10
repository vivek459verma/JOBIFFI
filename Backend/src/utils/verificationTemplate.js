export const verificationTemplate = (verificationLink) => {
  // 🔧 PRODUCTION NOTE: These official URLs work for TESTING

  
  const playstoreBadge = process.env.PLAYSTORE_BADGE_URL || 
    'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png';
  const appstoreBadge = process.env.APPSTORE_BADGE_URL || 
    'https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg';
  
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Jobiffi Account</title>
  <style type="text/css">
    /* Reset styles for email clients */
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
    table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    
    /* Responsive styles for mobile */
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .mobile-padding { padding: 20px !important; }
      .mobile-center { text-align: center !important; }
      .badge-row td { display: block !important; width: 100% !important; padding: 8px 0 !important; text-align: center !important; }
      .badge-img { width: 135px !important; height: auto !important; max-width: 135px !important; margin: 0 auto !important; }
      .button-text { font-size: 15px !important; padding: 12px 30px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4;">
  
  <!-- Main wrapper table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        
        <!-- Email container - 600px max width -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px;">
          
          <!-- HEADER SECTION -->
          <tr>
            <td align="center" style="background-color: #0033cc; padding: 30px 20px; border-radius: 8px 8px 0 0;">
              <a href="https://jobiffi.com" style="font-size: 32px; font-weight: bold; color: #ffffff; text-decoration: none; font-family: Arial, Helvetica, sans-serif; display: inline-block;">
                Jobiffi
              </a>
            </td>
          </tr>
          
          <!-- CONTENT SECTION -->
          <tr>
            <td style="padding: 40px 30px;" class="mobile-padding">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                
                <!-- Greeting -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 15px;">
                    Dear Jobseeker,
                  </td>
                </tr>
                
                <!-- Main message -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 25px;">
                    Thank you for registering with <strong>Jobiffi</strong>. Please verify your email address to activate your account.
                  </td>
                </tr>
                
                <!-- Verify button -->
                <tr>
                  <td align="center" style="padding: 20px 0 30px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" style="border-radius: 6px; background-color: #0033cc;">
                          <a href="${verificationLink}" target="_blank" class="button-text" style="font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #ffffff; text-decoration: none; border-radius: 6px; padding: 14px 40px; border: 1px solid #0033cc; display: inline-block; font-weight: bold;">
                            Verify My Account
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Fallback link text -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 20px; color: #666666; padding-bottom: 20px;">
                    If the button doesn't work, copy and paste this link:<br/>
                    <a href="${verificationLink}" style="color: #0033cc; word-break: break-all; text-decoration: underline;">${verificationLink}</a>
                  </td>
                </tr>
                
                <!-- Signature -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-top: 20px;">
                    Regards,<br/>
                    <strong>Jobiffi Team</strong>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- SEPARATOR LINE -->
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
                
                <!-- Section title -->
                <tr>
                  <td align="center" style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; color: #666666; padding-bottom: 20px;">
                    Get the Jobiffi App
                  </td>
                </tr>
                
                <!-- Badge images row -->
                <tr>
                  <td align="center">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                      <tr class="badge-row">
                        
                        <!-- Google Play Badge -->
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://play.google.com/store/apps/details?id=com.jobiffi" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="${playstoreBadge}" alt="Get it on Google Play" width="150" height="45" class="badge-img" style="display: block; border: 0; width: 150px; height: auto; max-width: 150px;" />
                          </a>
                        </td>
                        
                        <!-- App Store Badge -->
                        <td align="center" valign="middle" style="padding: 0 10px;">
                          <a href="https://apps.apple.com/app/jobiffi/id" target="_blank" style="display: inline-block; text-decoration: none;">
                            <img src="${appstoreBadge}" alt="Download on the App Store" width="150" height="45" class="badge-img" style="display: block; border: 0; width: 150px; height: auto; max-width: 150px;" />
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
                
                <!-- Report problem link -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 20px; color: #666666; padding-bottom: 15px;">
                    <a href="https://jobiffi.com/report" style="color: #0033cc; text-decoration: none; font-weight: 500;">Report a problem</a>
                  </td>
                </tr>
                
                <!-- System message disclaimer -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 15px;">
                    You have received this mail because your e-mail ID is registered with Jobiffi.com. This is a system-generated e-mail regarding your account preferences. Please do not reply to this message.
                  </td>
                </tr>
                
                <!-- Safety warning box -->
                <tr>
                  <td style="border-top: 1px dashed #cccccc; padding-top: 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      
                      <!-- Warning text -->
                      <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 12px;">
                          Jobiffi has taken all reasonable steps to ensure the authenticity of information in this mailer. Users are advised to research the bonafides of advertisers independently. 
                          <strong style="color: #333333;">Please do not pay any money to anyone who promises to find you a job.</strong>
                        </td>
                      </tr>
                      
                      <!-- Terms and security links -->
                      <tr>
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 18px; color: #666666; padding-bottom: 15px;">
                          We recommend that you visit our 
                          <a href="https://jobiffi.com/terms" style="color: #0033cc; text-decoration: none; font-weight: 500;">Terms and Conditions</a> and 
                          <a href="https://jobiffi.com/security" style="color: #0033cc; text-decoration: none; font-weight: 500;">Security Advice</a> for more information.
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
                
                <!-- Copyright and footer links -->
                <tr>
                  <td style="font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #999999; padding-top: 15px; text-align: center; border-top: 1px solid #e0e0e0;">
                    © 2026 Jobiffi. All rights reserved.<br/>
                    <a href="https://jobiffi.com/privacy" style="color: #0033cc; text-decoration: none; margin: 0 5px;">Privacy Policy</a> | 
                    <a href="https://jobiffi.com/terms" style="color: #0033cc; text-decoration: none; margin: 0 5px;">Terms of Service</a>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
        </table>
        <!-- End email container -->
        
      </td>
    </tr>
  </table>
  <!-- End main wrapper -->
  
</body>
</html>
`;
};