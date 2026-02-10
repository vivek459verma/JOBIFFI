import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../models/User.model.js";

// 🔵 GOOGLE OAUTH STRATEGY
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user exists with Google ID
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            // Check if email already exists (link accounts)
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
              // Link Google to existing account
              user.googleId = profile.id;
              user.authProvider = "GOOGLE";
              user.profilePicture = profile.photos[0]?.value;
              await user.save();
            } else {
              // Create new user
              user = await User.create({
                googleId: profile.id,
                fullName: profile.displayName,
                name: profile.displayName,
                email: profile.emails[0].value,
                authProvider: "GOOGLE",
                profilePicture: profile.photos[0]?.value,
                isEmailVerified: true, // Google emails are pre-verified
                role: "JOB_SEEKER",
                profileCompletion: 15,
                // These will be collected in onboarding
                mobile: "",
                workStatus: "FRESHER",
                currentCity: "",
                // Add a random password hash for compatibility
                password: Math.random().toString(36).slice(-16),
                passwordHash: Math.random().toString(36).slice(-16)
              });
            }
          }

          return done(null, user);
        } catch (error) {
          console.error("Google OAuth Error:", error);
          return done(error, null);
        }
      }
    )
  );
  console.log("✅ Google OAuth Strategy initialized");
} else {
  console.log("⚠️  Google OAuth disabled - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}

// 🔵 LINKEDIN OAUTH STRATEGY 
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  passport.use(
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/linkedin/callback`,
        scope: ["r_emailaddress", "r_liteprofile"]
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ linkedInId: profile.id });

          if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
              user.linkedInId = profile.id;
              user.authProvider = "LINKEDIN";
              user.profilePicture = profile.photos[0]?.value;
              await user.save();
            } else {
              user = await User.create({
                linkedInId: profile.id,
                fullName: profile.displayName,
                name: profile.displayName,
                email: profile.emails[0].value,
                authProvider: "LINKEDIN",
                profilePicture: profile.photos[0]?.value,
                isEmailVerified: true,
                role: "JOB_SEEKER",
                profileCompletion: 15,
                mobile: "",
                workStatus: "EXPERIENCED",
                currentCity: "",
                // Add a random password hash for compatibility
                password: Math.random().toString(36).slice(-16),
                passwordHash: Math.random().toString(36).slice(-16)
              });
            }
          }

          return done(null, user);
        } catch (error) {
          console.error("LinkedIn OAuth Error:", error);
          return done(error, null);
        }
      }
    )
  );
  console.log("✅ LinkedIn OAuth Strategy initialized");
} else {
  console.log("⚠️  LinkedIn OAuth disabled - missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET");
}

export default passport;