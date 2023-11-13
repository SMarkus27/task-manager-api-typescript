import {UsersRepository} from "@repositories/users/repository";
import {UserModel} from "@domain/models/users/model";

jest.mock("../../../src/domain/models/users/model")

describe("Users Repository", () => {
    let usersRepository: UsersRepository;

    beforeEach(() => {
        usersRepository = new UsersRepository();
    });


    it('should create an user and return a token', async () => {
        const userData = {
            username: "xaps",
            password: "1234567",
            email: "test2@gmail.com"
        };
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMWExYWExYTExYTFhIiwiaWF0IjoxNjk4OTMyOTQwLCJleHAiOjE2OTkwMTkzNDB9.L7M868Ns-_oVCuyM5IRBIZYcWC6X2z8nwygKWcMtyFM"
        UserModel.create = jest.fn().mockImplementation(() => userData)
        usersRepository.getToken = jest.fn().mockImplementation(() => token)
        const result = await usersRepository.createUser(userData)
        expect(result).toEqual(token)
    });


});