const catchAsyncError = (fn) => (req, res, next) => {
    //  resolve means try to execute the function else catch the error and pass it to next middleware which is errorMiddleware
    Promise.resolve(fn(req, res, next)).catch(next);
};

export default catchAsyncError;