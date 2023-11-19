import Url from "../Models/url.js"
import User from "../Models/user.js"
import catchAsyncError from "../middlewares/common/catchAsyncError.js"
import AnalyticsHandlers from "../utils/AnalyticsLogicHanlders.js"
import ErrorHandler from "../utils/Error.js"
import { getLocationDetails } from "../utils/getLocationDetails.js"

export const getURLAnalytics = catchAsyncError(
    async (req, res, next) => {
        const ip = req.clientIp;

        const { shortedId } = req.params

        if (!shortedId) {
            return next(new ErrorHandler(`Missing params`, 400));
        }
        const isAvailable = await Url.findOne({ shortedID: shortedId }) || null
        const { country, countryCode, regionName, city } = await getLocationDetails(ip)


        if (isAvailable) {
            const { date, shortedID, shortenURL, clicks, visitHistory } = isAvailable
            res.status(200).send({
                success: true,
                data: {
                    date,
                    shortedId: shortedID,
                    shortenURL, clicks, visitHistory, country, countryCode, regionName
                }
            })
        }
        else {
            return next(new ErrorHandler(`URL does not exist!`, 404));
            // or return next(error) 
        }
    }
)




export const getUserAnalytics = catchAsyncError(
    async (req, res, next) => {
        const userEmail = req.query.email
        console.log("🚀 ~ file: analyticsController.js:44 ~ userEmail:", userEmail)
        if (!userEmail) {
            return next(new ErrorHandler(`Missing query params`, 400));
        }
        const userData = await User.findOne({
            email: userEmail
        }).populate('urls').exec()
        //    extracting infos from data of user

        const { urls, email } = userData
        const analytics = new AnalyticsHandlers()
        const totalVisits = analytics.totalVisits(urls)
        const totalUrls = analytics.totalUrls(urls)
        const topVisitedUrls = analytics.topVisitedUrls(urls)
        const latestUrls = analytics.topUrls(urls)

        res.status(200).send({
            success: true,
            data: {
                email, totalUrls, totalVisits, latestUrls, topVisitedUrls, limitLeftOver: (100 - totalUrls), limitUsed: totalUrls
            }
        })
    }
)