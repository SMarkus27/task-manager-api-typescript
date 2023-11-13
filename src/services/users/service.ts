import {errorHandler, ErrorResponse} from "@domain/responses/error/response";
import {UsersRepository} from "@repositories/users/repository";
import {IUsersService} from "@core/interfaces/services/users/interface";
import { config } from "dotenv";
import {invalidCredentialsError, noCredentialsError, authorizationError} from "@domain/errors/error";
import {createUserResponse} from "@domain/responses/users/response";
import {UserDataType} from "@domain/types/users/type";
import {Logger} from "@services/traceback/service";

const jwt = require("jsonwebtoken");
config()

export class UsersService implements IUsersService{
    private usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = new UsersRepository();
    }

    async createUser(userData: UserDataType, response){
        Logger.info(`Starting create user`);

        try {
            Logger.info(`Sending user info to MongoDB`)
            const token= await this.usersRepository.createUser(userData);
            Logger.info(`Create user Finished`);
            return createUserResponse(response, token)
        }
        catch (error) {
            Logger.info(`Failed to create user`);
           return errorHandler(error, response)
        }

    };


    async login(userData: UserDataType, response) {
        Logger.info(`Starting Login user`);

        const {email, password} = userData
        if (!email || !password) {
            return errorHandler(noCredentialsError, response)
        }

        Logger.info(`Starting matching credentials`);
        Logger.info(`Sending user info to MongoDB`);
        const user = await this.usersRepository.findUser({email}, {},{select: "+password", sanitizeFilter: true})
        const isMatch = await this.usersRepository.matchPassword(userData);

        if(!user || !isMatch) {
            return errorHandler(invalidCredentialsError, response)
        }
        Logger.info(`Matching credentials Finished`);

        const token = await this.usersRepository.getToken(email);
        Logger.info(`Finished to get user token`);
        Logger.info(`Finished user login`);

        return createUserResponse(response, token)

    }

    async authentication(request, response, next) {
        Logger.info(`Starting User Authentication`);

        let token;
        const headers = request.headers
        const authorizationToken = headers.authorization

        if (authorizationToken && authorizationToken.startsWith("Bearer")) {
            token = request.headers.authorization.split(" ")[1];
        }

        if(!token) {
            return  errorHandler(authorizationError, response)
        }

        try {
            Logger.info(`Starting token verification`);

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            Logger.info(`Token verification Finished`);

            const usersRepository = new UsersRepository();
            Logger.info(`Sending user info to MongoDB`);
            request.user =  await usersRepository.findUser({_id: decodedToken.id}, {_id: true}, {});
            next()
        }
        catch (err){
            Logger.info(`Failed to authenticate user`);
            return  errorHandler(err, response)
        }
    };




}