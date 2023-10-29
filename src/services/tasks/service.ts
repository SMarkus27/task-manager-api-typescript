import {TasksRepository} from "../../repositories/tasks/repository";
import {calculateEndIndex, calculateSkip, paginationResult} from "../../utils/utils";
import {errorHandler} from "../../domain/responses/error/response";
import {
    allTaskFoundResponse,
    createTaskResponse, taskFoundResponse,
    taskNotFoundResponse, updateTaskResponse
} from "../../domain/responses/tasks/response";
import {ITaskService} from "../../core/interfaces/services/tasks/interface";

export class TaskService implements ITaskService{
    private tasksRepository: TasksRepository;

    constructor() {
        this.tasksRepository = new TasksRepository();
    }

    async createTask( taskData: object, response) {
        try {
            const result= await this.tasksRepository.createTask(taskData);
            return createTaskResponse(response, result)
        }
        catch (error) {
           return errorHandler(error, response)
        }


    }

    async findAllTasks(taskData, response) {
        const sort = taskData["sort"] || "name";
        const page = +taskData["page"] || 1;
        const limit = +taskData["limit"] || 10;

        const skip = calculateSkip(page, limit);
        const endIndex = calculateEndIndex(page, limit);
        const {result, totalItems} = await this.tasksRepository.findAllPaginated({}, sort, skip, limit)
        const pagination = paginationResult(page, limit, endIndex, skip, totalItems)

        return allTaskFoundResponse(response, result, totalItems, pagination)
    }


    async findOneTask(taskData: object, response) {
        try {
            const taskId = taskData["id"];

            const filter = {_id: taskId}
            const projection = {_id:0, __v:0}
            const taskResult = await this.tasksRepository.findOne(filter,projection)

            if (!taskResult) {
                return taskNotFoundResponse(response, taskResult)
            }

            return taskFoundResponse(response, taskResult)

        }

        catch (error) {
            return errorHandler(error, response)
            }
        }

    async updateTask(taskData, response) {
        try {

            const newData = taskData["newData"]
            const taskId = taskData["id"]

            const filter = {_id: taskId}
            const projection = {_id:0, __v:0}
            const result = await this.tasksRepository.findOne(filter,projection)

            if (!result) {
                return taskNotFoundResponse(response, result)
            }

            const taskUpdated = await this.tasksRepository.update(filter, newData)

            return updateTaskResponse(response,taskUpdated )

        }
        catch (error) {
            return errorHandler(error, response)
        }

    }

}