import jwt from 'jsonwebtoken';

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        payload,
        process.env.JWT_SECRET || "default_secret_key",
        { expiresIn: "7d" }
    );

    return { accessToken, refreshToken };
};
