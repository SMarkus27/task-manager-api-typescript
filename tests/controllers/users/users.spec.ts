import {UsersController} from "@controllers/users/controller";
import {UsersService} from "@services/users/service";

describe("User Controller", () => {
    let usersController: UsersController;

    beforeEach(() => {
        usersController = new UsersController();
    });


    it('should create an user', async () =>  {
        const request = {
            body: {
                username: "user1",
                password: "123456",
                email: "email1@gmail.com"
            }
        };
        jest.spyOn(UsersService.prototype, "createUser").mockImplementation( async () => {})

        await usersController.createUser(request, Response)
        expect(UsersService.prototype.createUser).toBeCalledTimes(1)

    });

    it('should login an user', async () =>  {
        const request = {
            body: {
                username: "user1",
                password: "123456",
                email: "email1@gmail.com"
            }
        };

        jest.spyOn(UsersService.prototype, "login").mockImplementation( async () => {})
        await usersController.login(request, Response)

        expect(UsersService.prototype.login).toBeCalledTimes(1)

    });

});
