export const createUserResponse = (response, token) => {
    return response.status(200).json({
        success: true,
        token: token
    })
}