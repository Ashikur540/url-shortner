import jwt from "jsonwebtoken";
import User from "../../Models/user.js";
import ErrorHandler from "../../utils/Error.js";
import catchAsyncError from "./catchAsyncError.js";

const apiRouteMiddleware = catchAsyncError(
    async (req, res, next) => {
        const cookies = req?.signedCookies;
        const AppCookie = cookies[process.env.AUTH_COOKIE_NAME] || ""
        const tokenToValidate = AppCookie;
        console.log("🚀 ~ file: apiRoutesMiddleware.js:11 ~ tokenToValidate:", tokenToValidate)
        

        if (!tokenToValidate) {
            return next(new ErrorHandler('unauthorised access', 401))
        }

        jwt.verify(tokenToValidate, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            console.log("🚀 ~ file: apiRoutesMiddleware.js:17 ~ jwt.verify ~ decoded:", decoded)
            const { email, username } = decoded || {}

            // after decong the token finding that user in database
            const userData = await User.findOne({
                $or: [{ email }, { username }]
            }) || null
            //  now setting user information in api routes
            const userObj = {
                username: userData?.username,
                email: userData?.email,
                id: userData?._id
            }



            if (err) {
                console.log("🚀 ~ file: apiRoutesMiddleware.js:18 ~ jwt.verify ~ err:", err)
                return next(new ErrorHandler('unauthorised access', 401))
            }

            // request object e ekta property add korlam and value set korlam
            req.user = userObj
            next();
        })

    }
)
export default apiRouteMiddleware;