
export interface ITasksRepository {

    createTask(data: object)
    findAllPaginatedTasks(filter: object, sort: string, skip: number, limit: number)
    findTask(filter: object, projection: object)
    updateTask(filter: object, newData: object)
}