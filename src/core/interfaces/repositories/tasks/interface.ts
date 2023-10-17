
export interface ITasksRepository {

    createTask(data: object)
    findAllPaginated(filter: object, sort: string, skip: number, limit: number)
    findOne(filter: object, projection: object)
    update(filter: object, newData: object)
}