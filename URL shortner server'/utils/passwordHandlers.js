

import bcrypt from 'bcryptjs';


export const getHashedPassword = async (password) => {
    try {
        let hashedPass = ''
        hashedPass = await bcrypt.hash(password, 9)
        return hashedPass
    } catch (error) {
        console.log("🚀 ~ file: passwordHandlers.js:13 ~ getHashedPassword ~ error:", error)
        // throw new Error(error)
    }
}


export const isPasswordMatched = async (hashedPass, userProvidedPass) => {
    try {
        let matched 
        matched = await bcrypt.compare(hashedPass, userProvidedPass)
        console.log("🚀 ~ file: passwordHandlers.js:22 ~ isPasswordMatched ~ matched:", matched)
        return matched
    } catch (error) {
        console.log("🚀 ~ file: passwordHandlers.js:24 ~ isPasswordMatched ~ error:", error)
        // throw new Error(error)
    }
}