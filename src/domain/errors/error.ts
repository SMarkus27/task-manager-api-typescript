export const noCredentialsError = {
        message: "Please provide an email and password",
        statusCode: 400
};

export const invalidCredentialsError = {
    message: "Invalid credentials",
    statusCode: 401
}

export const authorizationError={
    message: "Not authorize to access this route",
    statusCode: 401
}

export const notAuthorizedError={
    message: "User is not authorized to update this task",
    statusCode: 401
}
