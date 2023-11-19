import Url from "../Models/url.js";
import User from "../Models/user.js";
import catchAsyncError from "../middlewares/common/catchAsyncError.js";
import ErrorHandler from "../utils/Error.js";
import { issueAccessToken, issueRefreshToken } from "../utils/handleJwtTokens.js";
import { getHashedPassword, isPasswordMatched } from "../utils/passwordHandlers.js";
import { validateEmail } from "../utils/validateEmail.js";




export const registerUser = catchAsyncError(
    async (req, res, next) => {
        let { username, email, password } = req.body

        if ((!username || !email) && !password) {
            return next(new ErrorHandler("Email or password should not be empty", 400))
        }
        if (password.length < 6) {
            return next(new ErrorHandler("Password should at least 6 characters", 400))

        }
        if (email.length) {
            let isValidEmail = validateEmail(email)
            if (!isValidEmail) return next(new ErrorHandler("Invalid email address", 400))
        }


        password = await getHashedPassword(password)
        const alreadyUser = await User.findOne({ email }) || null

        if (alreadyUser) {
            return next(new ErrorHandler("User already exist", 400))
        }
        let newUser = await User.create({
            username,
            password,
            email,
        })

        if (newUser) {
            const maxAge = 24 * 60 * 60;
            const token = issueAccessToken({ email, username })

            res.cookie(process.env.AUTH_COOKIE_NAME, token, {
                httpOnly: true,
                maxAge: maxAge * 1000, // 3hrs in ms
                signed: true,
            });
            res.status(201).send({
                success: true,
                message: "User created successfully",
                newUser
            })
        }
    }
)




export const loginUser = catchAsyncError(
    async (req, res, next) => {
        let { email, password, username } = req.body
        if ((!username || !email) && !password) {
            return next(new ErrorHandler("Email or password should not be empty", 400))
        }


        //  querying by username or email 
        const alreadyUser = await User.findOne({
            $or: [{ email }, { username }]
        }) || null
        console.log("🚀 ~ file: userController.js:64 ~ alreadyUser:", alreadyUser)

        const matched = await isPasswordMatched(password, alreadyUser?.password)
        console.log("🚀 ~ file: userController.js:66 ~ matched:", matched)
        if (alreadyUser && !matched) {
            return next(new ErrorHandler('Wrong password', 401))
        }

        if (alreadyUser && matched) {
            const maxAge = 24 * 60 * 60; // 24 hrs 
            const accessToken = issueAccessToken({ email, username })
            const refreshToken = issueRefreshToken({ email, username })

            res.cookie(process.env.AUTH_COOKIE_NAME, refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 24hrs in ms
                signed: true,
            });

            res.status(200).send({
                success: true,
                message: "User logged in successfully",
                user: alreadyUser,
                accessToken, refreshToken
            })
        }
        else {
            // forbidden
            return next(new ErrorHandler('Login failed!', 403))
        }
    }
)


export const logoutUser = catchAsyncError(
    async (req, res, next) => {
        const { email, username } = req.body
        if (!email || !username) {
            return next(new ErrorHandler('Operation failed!'))
        }

        const userFound = await User.findOne({
            $or: [{ email }, { username }]
        }) || false

        if (!userFound) {
            return next(new ErrorHandler('Operation failed!'))
        }
        res.clearCookie(process.env.AUTH_COOKIE_NAME)
        res.status(200).send({
            message: "Logout successfull",
            success: true
        })
    }
)





export const getUrlsCreatedByUser = catchAsyncError(
    async (req, res, next) => {
        const userId = req.user.id; // Assuming you have the user's ObjectId

        // Use .populate() to fetch the user data along with the URLs
        const userUrls = await Url.find({ user: userId }).populate('user') || null
        res.status(200).json({
            success: true,
            data: userUrls,
        });
    }
);



