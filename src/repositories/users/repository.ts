import {UserModel} from "../../domain/models/users/model";
import {IUserRepository} from "../../core/interfaces/repositories/users/interface";

export class UsersRepository implements IUserRepository {

    async createUser(data: object){
        return await UserModel.create(data);
    };

    async findUser(filter: object, projection: object){
        return UserModel.findOne(filter, projection)
    };
    async updateUser(filter: object, newData: object){
        return UserModel.updateOne(filter, newData)
    };

}