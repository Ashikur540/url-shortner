import Url from "../Models/url.js";
import User from "../Models/user.js";
import catchAsyncError from "../middlewares/common/catchAsyncError.js";
import ErrorHandler from "../utils/Error.js";
import { getShortenUrl } from "../utils/getShortenUrl.js";
import { validateURL } from "../utils/validateUrl.js";

export const getAllUrls = async (req, res) => {
    const allUrls = await Url.find({}, []);
    res.send({
        success: true,
        allUrls,
    });
}


export const createUrl = catchAsyncError(
    async (req, res, next) => {
        const { originalURL } = req.body
        // console.log(req.user)
        if (!req.body.originalURL) {
            return next(new ErrorHandler(`Please enter a URL`, 400));
        }
        const isValid = validateURL(req.body.originalURL);

        if (!isValid) {
            return next(new ErrorHandler(`Not a valid URL`, 400));
        }
        const { shortedUrl, shortId } = getShortenUrl(req.body.originalURL);
        const newUrl = {
            shortenURL: shortedUrl,
            originalURL: originalURL,
            shortedID: shortId,
            clicks: 0,
            user: req.user.id  // pushing the logged in and authroised user _id in the database
        }
        const result = await Url.create(newUrl)
  
        const { shortenURL, shortedID, _id } = result
        //  also populating the User data base url field -> to see how much urls user is creating
        await User.updateOne(
            {
                email: req?.user?.email
            },
            {
                $push: {
                    urls: _id
                }
            }

        )
        /* 
         const totalRecords = await Url.find({}).countDocuments() == 1 ? 0 : await Url.find({}).countDocuments()
         await Url.updateOne({ _id: newUrl._id }, { $inc: { urlID: totalRecords - 1 } });
        */
        if (result != null) {
            return res.status(201).send({
                success: true,
                message: "URL created successfully",
                data: {
                    shortenURL, shortedID
                }
            });
        }


        res.send('URL created');

    }

)


export const getSingleUrl = catchAsyncError(
    async (req, res, next) => {
        const { shortedId } = req.params
        const isAvailable = await Url.findOne({ shortedID: shortedId })
        //  if available then update vissit (history and click) for analytics
        if (isAvailable) {
            await Url.updateOne(
                {
                    shortedID: shortedId
                },
                {
                    $inc: { clicks: 1 },
                    $push: {
                        visitHistory: {
                            timestamp: Date.now()
                        }
                    }
                }
            );
            return res.redirect(isAvailable.originalURL)
        }
        else {
            return next(new ErrorHandler(`URL does not exist!`, 404));
            // or return next(error) 
        }
    }
)



export const editUrl = catchAsyncError(
    async (req, res, next) => {
        const { shortedId } = req.params;
        const { editedURL } = req.body
        const isValidUrl = validateURL(editedURL)
        if (!isValidUrl) {
            return next(new ErrorHandler("Url is not valid!", 400))
        }
        const isAvailable = await Url.findOne({ shortedID: shortedId }) || null
        //  if available then update vissit history andf click for analytics
        if (isAvailable) {
            const updated = await Url.findOneAndUpdate(
                {
                    shortedID: shortedId
                },
                {
                    originalURL: editedURL
                },
                {
                    new: true
                }
            );

            return res.status(200).send({
                success: true,
                data: {
                    url: updated?.originalURL
                }
            })
        }
        else {
            return next(new ErrorHandler(`Wrong URL info!`, 404));
            // or return next(error) 
        }
    }
)

