import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as OAuth2Strategy } from "passport-oauth2";
import User from "../models/User.model.js";

// 🔵 GOOGLE OAUTH STRATEGY
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/google/callback`
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
              user.googleId = profile.id;
              user.authProvider = "GOOGLE";
              user.profilePicture = profile.photos[0]?.value;
              await user.save();
            } else {
              user = await User.create({
                googleId: profile.id,
                fullName: profile.displayName,
                email: profile.emails[0].value,
                authProvider: "GOOGLE",
                profilePicture: profile.photos[0]?.value,
                isEmailVerified: true,
                role: "JOB_SEEKER",
                profileCompletion: 15,
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
}

// 🔵 LINKEDIN OAUTH STRATEGY (OIDC COMPLIANT)
if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  const linkedinStrategy = new OAuth2Strategy(
    {
      authorizationURL: "https://www.linkedin.com/oauth/v2/authorization",
      tokenURL: "https://www.linkedin.com/oauth/v2/accessToken",
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/auth/linkedin/callback`,
      scope: ["openid", "profile", "email"],
      state: false
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const linkedInId = profile.id;

        if (!email) return done(new Error("No email found in LinkedIn profile"), null);

        let user = await User.findOne({ linkedInId: linkedInId });
        if (!user) {
          user = await User.findOne({ email: email.toLowerCase() });
          if (user) {
            user.linkedInId = linkedInId;
            user.authProvider = "LINKEDIN";
            if (profile.photos?.[0]?.value) user.profilePicture = profile.photos[0].value;
            await user.save();
          } else {
            user = await User.create({
              linkedInId: linkedInId,
              fullName: profile.displayName,
              email: email.toLowerCase(),
              authProvider: "LINKEDIN",
              profilePicture: profile.photos?.[0]?.value,
              isEmailVerified: true,
              role: "JOB_SEEKER",
              profileCompletion: 15,
              passwordHash: Math.random().toString(36).slice(-16)
            });
          }
        }
        return done(null, user);
      } catch (error) {
        console.error("LinkedIn Strategy Logic Error:", error);
        return done(error, null);
      }
    }
  );

  // ✅ FORCED OIDC PROFILE FETCH WITH DETAILED LOGGING
  linkedinStrategy.userProfile = function (accessToken, done) {
    console.log("LinkedIn OIDC: Initiating profile fetch...");
    if (!accessToken) {
      console.error("LinkedIn OIDC: Missing access token!");
      return done(new Error("No access token provided"));
    }

    // Explicitly use the internal _request to force the Authorization header
    // This avoids library-specific checks and ensures the token is sent correctly
    this._oauth2._request("GET", "https://api.linkedin.com/v2/userinfo", {
      "Authorization": "Bearer " + accessToken,
      "x-li-format": "json"
    }, "", null, function (err, body, res) {
      if (err) {
        console.error("LinkedIn OIDC Fetch Error Details:", {
          statusCode: err.statusCode,
          data: err.data,
          message: err.message
        });

        let msg = `Profile fetch failed (Status: ${err.statusCode || '??'})`;
        if (err.data) msg += `: ${err.data}`;
        else if (err.message) msg += `: ${err.message}`;

        return done(new Error(msg));
      }

      try {
        console.log("LinkedIn OIDC: Raw profile body received");
        const json = JSON.parse(body);

        const profile = {
          provider: 'linkedin',
          id: json.sub,
          displayName: json.name,
          name: { givenName: json.given_name, familyName: json.family_name },
          emails: [{ value: json.email }],
          photos: [{ value: json.picture }],
          _raw: body,
          _json: json
        };
        done(null, profile);
      } catch (e) {
        console.error("LinkedIn OIDC: JSON Parse Error:", e.message);
        done(new Error("Failed to parse LinkedIn response: " + e.message));
      }
    });
  };

  passport.use("linkedin", linkedinStrategy);
  console.log("✅ LinkedIn OIDC Strategy Ready");
}

export default passport;