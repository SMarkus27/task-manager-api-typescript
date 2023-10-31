export const createUserResponse = (response, token) => {
    response.status(200).json({
        success: true,
        token: token
    })
}