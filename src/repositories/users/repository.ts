import {UserModel} from "../../domain/models/users/model";
import {IUserRepository} from "../../core/interfaces/repositories/users/interface";
import {UserDataType, UserFilterType, UserOptionsType, UserProjectionType} from "../../domain/types/users/type";

export class UsersRepository implements IUserRepository {

    async createUser(data: UserDataType){
        const user  = await UserModel.create(data)
        const token = user.getJwtToken();
        return token;
    };

    async findUser(filter: UserFilterType, projection: UserProjectionType, options: UserOptionsType){
        return UserModel.findOne(filter, projection, options)
    };

    async matchPassword(userData: UserDataType) {
        const {email, password} = userData
        const user  = await UserModel.findOne({email: email}).select("+password")
        if(!user){
            return false
        }
        return user.matchPassword(password)
    }

    async getToken(email: string) {
        const user  = await UserModel.findOne({email: email})
        return user.getJwtToken();
    }

}