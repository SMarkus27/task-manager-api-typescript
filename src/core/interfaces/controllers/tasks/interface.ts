
export interface ITaskController {
    createTask( taskData: object, response);
    findAllTasks(taskData, response);
    findOneTask(taskData: object, response);
    updateTask(taskData, response);
}