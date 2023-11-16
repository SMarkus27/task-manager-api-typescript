
export interface ITaskService {
    createTask( taskData: object, response);
    findAllTasks(taskData, response);
    findOneTask(taskData: object, response);
    updateTask(taskData, response);

}