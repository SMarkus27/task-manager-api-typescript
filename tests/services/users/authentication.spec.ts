import {UsersService} from "@services/users/service";
import {errorHandler} from "@domain/responses/error/response";
import {response} from "express";
import {UsersRepository} from "@repositories/users/repository";
const jwt = require("jsonwebtoken");

jest.mock("../../../src/domain/responses/error/response")
describe("User Service", () => {

    let usersService: UsersService;

    beforeEach(() => {
        usersService = new UsersService();
    });

    it('should throw authorization error', async () => {
        const request = {
            headers: {
                authorizationToken: ""
            }
        };

        await usersService.authentication(request, response, {});
        expect(errorHandler).toBeCalledTimes(1);

    });

    it('should throw Invalid Token', async () => {
        const request = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMWExYWExYTExYTFhIiwiaWF0IjoxNjk4OTMyOTQwLCJleHAiOjE2OTkwMTkzNDB9.L7M868Ns-_oVCuyM5IRBIZYcWC6X2z8nwygKWcMtyFM"
            }
        };

        await usersService.authentication(request, response, {});
        expect(errorHandler).toBeCalledTimes(1);

    });

    it('should authenticated user', async () => {
        const request = {
            headers: {
                authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMWExYWExYTExYTFhIiwiaWF0IjoxNjk4OTMyOTQwLCJleHAiOjE2OTkwMTkzNDB9.L7M868Ns-_oVCuyM5IRBIZYcWC6X2z8nwygKWcMtyFM"
            }
        };

        const user = {
            id: "123456"
        }

        jest.spyOn(jwt, "verify").mockImplementation(()=> user)
        // @ts-ignore
        jest.spyOn(UsersRepository.prototype, "findUser").mockImplementation(async () => user);

        await usersService.authentication(request, response, {});

    });
});