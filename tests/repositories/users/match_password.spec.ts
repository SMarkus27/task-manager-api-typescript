import {UsersRepository} from "@repositories/users/repository";
import {UserModel} from "@domain/models/users/model";

describe("Users Repository", () => {
    let usersRepository: UsersRepository;

    beforeEach(() => {
        usersRepository = new UsersRepository();
    });


    it('should matchPassword return false', async () => {
        const userData = {
            username: "xaps",
            password: "1234567",
            email: "test2@gmail.com"
        };

        UserModel.findOne = jest.fn().mockImplementation(async () =>undefined);

        const result = await usersRepository.matchPassword(userData)

        expect(result).toBeFalsy()
    });

    it('should matchPassword password match', async () => {
        const userData = {
            username: "xaps",
            password: "123456",
            email: "test@gmail.com"
        };

        const xaps = {
            _id: "111a1aa1a11a1a",
            password: "$2a$10$4LRv.qmEWjMe2r..dv1BLOHyF6AoFIsimzHm.a8RRoa763N/3Cvj6"
        }

        UserModel.findOne = jest.fn().mockImplementation(async () => {
            return {_id: "111a1aa1a11a1a", password: "$2a$10$4LRv.qmEWjMe2r..dv1BLOHyF6AoFIsimzHm.a8RRoa763N/3Cvj6"}
        });

        const result = await usersRepository.matchPassword(userData)

        expect(result).toBeTruthy()
    });

    it('should matchPassword not match', async () => {
        const userData = {
            username: "xaps",
            password: "1234567",
            email: "test@gmail.com"
        };

        UserModel.findOne = jest.fn().mockImplementation(async () => {
            return {_id: "111a1aa1a11a1a", password: "$2a$10$4LRv.qmEWjMe2r..dv1BLOHyF6AoFIsimzHm.a8RRoa763N/3Cvj6"}
        });

        const result = await usersRepository.matchPassword(userData)

        expect(result).toBeFalsy()
    });
});