
export interface IUserRepository {

    createUser(data: object)
    findUser(filter: object, projection: object, options: object)
    updateUser(filter: object, newData: object)
    matchPassword(userData: object)
}