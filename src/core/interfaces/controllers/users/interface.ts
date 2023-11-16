
export interface IUsersController {
    createUser( taskData: object, response): Promise<Response>;
    login(request, response, next): Promise<Response>
}