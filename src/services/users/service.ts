import {errorHandler} from "../../domain/responses/error/response";
import {UsersRepository} from "../../repositories/users/repository";
import {IUsersService} from "../../core/interfaces/services/users/interface";


export class UsersService implements IUsersService{
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async createUser( userData: object, response) {
        try {
            const result= await this.usersRepository.createUser(userData);
            return response.status(201).json({
                success: true,
                data: result
            })
        }
        catch (error) {
           return errorHandler(error, response)
        }


    }



}