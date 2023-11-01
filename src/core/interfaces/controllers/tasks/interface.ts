
export interface ITaskController {
    createTask( taskData: object, response): Promise<Response>;
    findAllTasks(taskData, response): Promise<Response>;
    findOneTask(taskData: object, response): Promise<Response>;
    updateTask(taskData, response): Promise<Response>;
}