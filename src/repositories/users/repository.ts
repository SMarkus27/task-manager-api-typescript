import {UserModel} from "../../domain/models/users/model";
import {IUserRepository} from "../../core/interfaces/repositories/users/interface";
import {UserDataType, UserFilterType, UserOptionsType, UserProjectionType} from "../../domain/types/users/type";
import * as bcrypt from "bcryptjs"
const jwt = require("jsonwebtoken");

export class UsersRepository implements IUserRepository {

    async createUser(data: UserDataType){
        const user = await UserModel.create(data)
        const token = await this.getToken(user.email)
        console.log(token)
        return token
    };

    async findUser(filter: UserFilterType, projection: UserProjectionType, options: UserOptionsType){
        return UserModel.findOne(filter, projection, options)
    };


    async matchPassword(userData: UserDataType) {
        const {email, password} = userData
        const user  = await UserModel.findOne({email: email})
        if(!user){
            return false
        }

        const userPasswordMatch = await bcrypt.compare(password, user.password)
        return userPasswordMatch
    }

    async getToken(email: string) {
        const user  = await UserModel.findOne({email: email})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        return token;
    }


}