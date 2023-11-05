import {UsersService} from "../../../src/services/users/service";
import {response} from "express";
import {errorHandler} from "../../../src/domain/responses/error/response";
import {UsersRepository} from "../../../src/repositories/users/repository";

const responses = require("../../../src/domain/responses/users/response")

jest.mock("../../../src/domain/responses/error/response")
describe("User Service", () => {


    let usersService: UsersService;

    beforeEach(() => {
        usersService = new UsersService();
    });

    it('should throw no credentials error', async () => {
        const userData = {
            username: null,
            email: null,
            password: null
        }
        await usersService.login(userData, response);
        expect(errorHandler).toBeCalledTimes(1);
    });

    it('should not find an user', async () => {
        const userData = {
            username: "user 1",
            email: "email@gmail.com",
            password: "123456"
        };

        const result = {...userData, _id: "111111111"};

        jest.spyOn(UsersRepository.prototype, "findUser").mockImplementation(async () => undefined);
        jest.spyOn(UsersRepository.prototype, "matchPassword").mockImplementation(async () => undefined);

        await usersService.login(userData, response);
        expect(errorHandler).toBeCalledTimes(1);
    });

    it('should login user', async () => {
        const userData = {
            username: "user 1",
            email: "email@gmail.com",
            password: "123456"
        };

        const result = {...userData, _id: "111111111"};

        // @ts-ignore
        jest.spyOn(UsersRepository.prototype, "findUser").mockImplementation(async () => result);
        jest.spyOn(UsersRepository.prototype, "matchPassword").mockImplementation(async () => true);

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMWExYWExYTExYTFhIiwiaWF0IjoxNjk4OTMyOTQwLCJleHAiOjE2OTkwMTkzNDB9.L7M868Ns-_oVCuyM5IRBIZYcWC6X2z8nwygKWcMtyFM"

        jest.spyOn(responses, "createUserResponse").mockImplementation(() => jest.fn());
        jest.spyOn(UsersRepository.prototype, "getToken").mockImplementation(async () => token);

        await usersService.login(userData, response);
        expect(responses.createUserResponse).toBeCalledTimes(1);
    });

});
