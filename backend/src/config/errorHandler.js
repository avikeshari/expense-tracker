
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // Invalid MongoDB ObjectId
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid resource ID";
    }

    // Duplicate MongoDB document
    if (err.code === 11000) {
        statusCode = 409;
        message = "A record with these details already exists";
    }

    // Malformed JSON
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        statusCode = 400;
        message = "Invalid JSON request body";
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};

export default errorHandler;