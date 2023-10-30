
export interface IUserRepository {

    createUser(data: object)
    findUser(filter: object, projection: object)
    updateUser(filter: object, newData: object)
}