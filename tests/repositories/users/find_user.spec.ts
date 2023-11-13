import {UsersRepository} from "@repositories/users/repository";
import {UserModel} from "@domain/models/users/model";

jest.mock("../../../src/domain/models/users/model")

describe("Users Repository", () => {
    let usersRepository: UsersRepository;

    beforeEach(() => {
        usersRepository = new UsersRepository();
    });


    it('should return user', async () => {
        const userData = {
            username: "xaps",
            password: "1234567",
            email: "test2@gmail.com"
        };

        await usersRepository.findUser(userData, {}, {})

        expect(UserModel.findOne).toBeCalledWith(userData, {}, {})
    });


});