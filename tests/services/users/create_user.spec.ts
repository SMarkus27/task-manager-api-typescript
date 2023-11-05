import {UsersService} from "../../../src/services/users/service";
import {UsersRepository} from "../../../src/repositories/users/repository";
import {response} from "express";
const responses = require("../../../src/domain/responses/users/response")

describe("User Service", () => {
    let usersService: UsersService;

    beforeEach(() => {
        usersService = new UsersService();
    });


    it('should create a user', async () => {
        const userData = {
            username: "user 1",
            email: "email@gmail.com",
            password: "123456"
        };

        const result = {...userData, _id: "111111111"};

        jest.spyOn(responses, "createUserResponse").mockImplementation(() => jest.fn());
        jest.spyOn(UsersRepository.prototype, "createUser").mockImplementation(async () => result);

        await usersService.createUser(userData, response);

        expect(responses.createUserResponse).toBeCalledTimes(1);
    });

});