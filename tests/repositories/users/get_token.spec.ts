import {UsersRepository} from "../../../src/repositories/users/repository";
import {UserModel} from "../../../src/domain/models/users/model";
const jwt = require("jsonwebtoken");

describe("Users Repository", () => {
    let usersRepository: UsersRepository;

    beforeEach(() => {
        usersRepository = new UsersRepository();
    });

    it('should get a jwt token', async () => {
        const email = "email@gmail.com";
        UserModel.findOne = jest.fn().mockImplementation(async () => {
            return {_id: "111a1aa1a11a1a"}
        });

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMWExYWExYTExYTFhIiwiaWF0IjoxNjk4OTMyOTQwLCJleHAiOjE2OTkwMTkzNDB9.L7M868Ns-_oVCuyM5IRBIZYcWC6X2z8nwygKWcMtyFM"
        jwt.sign = jest.fn().mockImplementation(() => token)
        await usersRepository.getToken(email);

        expect(jwt.sign).toBeCalledTimes(1)
    });

});