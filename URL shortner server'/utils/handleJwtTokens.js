

import jwt from "jsonwebtoken";

export const issueAccessToken = (data) => {
   
    const token = jwt.sign(
        data,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    return token
}


export const issueRefreshToken = (data) => {
 
    const token = jwt.sign(
        data,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    return token
}

export const verifyToken = (token) => {
    if (!token) return;
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    console.log("🚀 ~ file: handleJwtTokens.js:20 ~ verifyToken ~ verified:", verified)
    return verified;
}