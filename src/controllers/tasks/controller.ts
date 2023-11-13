import {Response} from "express";
import {TaskService} from "@services/tasks/service";
import {ITaskController} from "@core/interfaces/controllers/tasks/interface";
import {Logger} from "@services/traceback/service";

const taskService =  new TaskService();

export class TaskController implements ITaskController {


    async createTask(request, response): Promise<Response> {
        Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
        const userId = request.user["_id"]
        const taskData = {...request.body, user: userId};
        return  await taskService.createTask(taskData, response);

    };

    async findOneTask(request, response): Promise<Response> {
        Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
        const taskData = request.params;
        return  await taskService.findOneTask(taskData, response)
    };

    async findAllTasks(request, response): Promise<Response>{
        Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
        const taskData = request.query;
        return await taskService.findAllTasks(taskData, response)
    };

   async updateTask(request, response): Promise<Response> {
       Logger.info(`Starting request ${request.method} ${request.protocol}://${request.get("host")}${request.originalUrl}`)
       const userId = request.user["_id"]
       const taskData = {newData: request.body, ...request.params, user: userId};
       return await taskService.updateTask(taskData, response)
   };

}

