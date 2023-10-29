import {TaskService} from "../../services/tasks/service";

const taskService =  new TaskService();


export class TaskController {


    async createTask(request, response, next) {
        const taskData = request.body;
        return  await taskService.createTask(taskData, response, next);

    };

    async findOneTask(request, response) {
        const taskData = request.params;
        return  await taskService.findOneTask(taskData, response)
    };

    async findAllTasks(request, response){
        const taskData = request.query;
        return await taskService.findAllTasks(taskData, response)
    };

   async updateTask(request, response) {
       const taskData = {newData: request.body, ...request.params};
       return await taskService.updateTask(taskData, response)
   }
}

