import {UserModel} from "../../domain/models/users/model";
import {IUserRepository} from "../../core/interfaces/repositories/users/interface";
import {UserDataType, UserFilterType, UserOptionsType, UserProjectionType} from "../../domain/types/users/type";
import * as bcrypt from "bcryptjs"
import {Logger} from "@services/traceback/service";
const jwt = require("jsonwebtoken");

export class UsersRepository implements IUserRepository {

    async createUser(data: UserDataType){
        Logger.info(`Receiving user info from create user`)

        const user = await UserModel.create(data)
        const token = await this.getToken(user.email)
        return token
    };

    async findUser(filter: UserFilterType, projection: UserProjectionType, options: UserOptionsType){
        Logger.info(`Receiving user info from find user`)
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
        Logger.info(`Starting get user token`);

        const user  = await UserModel.findOne({email: email})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        return token;
    }


}