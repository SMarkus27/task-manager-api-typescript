export class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
};


export const errorHandler = (err, response ) => {
    let error = {...err}
    error.message = err.message;

    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    response.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
}


