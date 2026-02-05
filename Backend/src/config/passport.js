import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.model.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID || "MOCK_CLIENT_ID",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MOCK_CLIENT_SECRET",
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link googleId if not present (optional, good for linking accounts)
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }
                    return done(null, user);
                }

                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    workStatus: "fresher", // Default
                    // Password, mobile left empty
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
