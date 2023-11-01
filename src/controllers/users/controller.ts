import {UsersService} from "../../services/users/service";
import {IUsersController} from "../../core/interfaces/controllers/users/interface";
import {UserDataType} from "../../domain/types/users/type";

const userService =  new UsersService()


export class UsersController implements IUsersController {

    async createUser(request, response): Promise<Response> {
        const userData = request.body;
        return  await userService.createUser(userData, response);
    };

    async login(request, response): Promise<Response> {
        const userData = request.body;
        return  await userService.login(userData, response);
    };


}

