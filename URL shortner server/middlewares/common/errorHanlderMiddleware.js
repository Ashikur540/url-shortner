const errorHanlderMiddleware = (err, req, res, next) => {
    console.log("🚀 whole error >", err)
    console.log("🚀 errorHanlderMiddleware ~ error message:", err.message.red)
    err.message = err.message || 'Internal Server Error';
    err.statusCode = err.statusCode || 500;
    //  create your own custom errors with status code 
    /* if (err.code === 11000) {
         err.message = `Duplicate Field Value Enter`;
         err.statusCode = 400;  // bad request
     }
     */
    //  create your own custom errors with status code 
    res.status(err.statusCode).send({
        success: false,
        message: err.message,
    })

}
export default errorHanlderMiddleware;