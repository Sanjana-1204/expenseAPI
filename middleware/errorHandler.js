



class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && this.statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const globalErrorHandler = (error, req, res, next) => {
    // assign the statusCode property of error object
    // to the response object and keep 500 as option 
    // 500 - internal server error
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    });
}

module.exports = {

    AppError,
    globalErrorHandler
}

