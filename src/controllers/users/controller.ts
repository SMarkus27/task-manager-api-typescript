import {UsersService} from "../../services/users/service";
import {IUsersController} from "../../core/interfaces/controllers/users/interface";

const userService =  new UsersService()


export class UsersController implements IUsersController {


    async createUser(request, response) {
        const userData = request.body;
        return  await userService.createUser(userData, response);

    };




}

