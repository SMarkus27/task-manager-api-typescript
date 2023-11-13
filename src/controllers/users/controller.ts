import {IUsersController} from "@core/interfaces/controllers/users/interface";
import {UsersService} from "@services/users/service";
import {Logger} from "@services/traceback/service";

const userService =  new UsersService()


export class UsersController implements IUsersController {

    async createUser(request, response): Promise<Response> {
        Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
        const userData = request.body;
        return  await userService.createUser(userData, response);
    };

    async login(request, response): Promise<Response> {
        Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
        const userData = request.body;
        return  await userService.login(userData, response);
    };


}

