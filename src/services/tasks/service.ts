import {TasksRepository} from "@repositories/tasks/repository";
import {calculateEndIndex, calculateSkip, paginationResult} from "@utils/utils";
import {errorHandler} from "@domain/responses/error/response";
import {
    allTaskFoundResponse,
    createTaskResponse, taskFoundResponse,
    taskNotFoundResponse, updateTaskResponse
} from "@domain/responses/tasks/response";
import {ITaskService} from "@core/interfaces/services/tasks/interface";
import {notAuthorizedError} from "@domain/errors/error";
import {
    FindAllTaskDataType,
    TaskDataType,
    TaskFilterServiceType,
    UpdateTaskDataType
} from "@domain/types/tasks/type";
import {Logger} from "@services/traceback/service";

export class TaskService implements ITaskService{
    private tasksRepository: TasksRepository;

    constructor() {
        this.tasksRepository = new TasksRepository();
    }

    async createTask( taskData: TaskDataType, response) {
        Logger.info(`Starting Create task`)

        try {
            Logger.info(`Sending task info to MongoDB`)

            const result= await this.tasksRepository.createTask(taskData);

            Logger.info(`Create task Finished`)

            return createTaskResponse(response, result)
        }
        catch (error) {
            Logger.error(`Failed Create task`)
           return errorHandler(error, response)
        }


    }

    async findAllTasks(taskData: FindAllTaskDataType, response) {
        Logger.info(`Starting Find All tasks`)

        const sort = taskData["sort"] || "name";
        const page = +taskData["page"] || 1;
        const limit = +taskData["limit"] || 10;

        const skip = calculateSkip(page, limit);
        const endIndex = calculateEndIndex(page, limit);

        Logger.info(`Sending task info to MongoDB`)

        const {result, totalItems} = await this.tasksRepository.findAllPaginatedTasks({}, sort, skip, limit)
        const pagination = paginationResult(page, limit, endIndex, skip, totalItems)

        Logger.info(`Find all tasks Finished`)

        return allTaskFoundResponse(response, result, totalItems, pagination)
    }


    async findOneTask(taskData: TaskFilterServiceType, response) {
        Logger.info(`Starting Find One task`)

        try {
            const taskId = taskData["id"]
            const filter = {_id: taskId}

            const projection = {_id: false, __v:false}

            Logger.info(`Sending task info to MongoDB`)

            const taskResult = await this.tasksRepository.findTask(filter, projection)

            if (!taskResult) {
                return taskNotFoundResponse(response, taskResult)
            }

            Logger.info(`Find One task Finished`)
            return taskFoundResponse(response, taskResult)

        }

        catch (error) {
            Logger.error(`Failed Find one task`)
            return errorHandler(error, response)
            }
        }

    async updateTask(taskData: UpdateTaskDataType, response) {
        Logger.info(`Starting Update One task`)

        try {

            const user = taskData.user;

            const newData = taskData["newData"];
            const taskId = taskData["id"];

            const filter = {_id: taskId};
            const projection = {_id:false, __v:false};

            Logger.info(`Sending task info to MongoDB`)

            // @ts-ignore
            const result = await this.tasksRepository.findTask(filter, projection)

            if (!result) {
                return taskNotFoundResponse(response, result)
            }

            if (result.user.toString() !== user.toString()) {
                return errorHandler(notAuthorizedError, response)
            }
            // @ts-ignore

            Logger.info(`Sending task info to MongoDB`)
            const taskUpdated = await this.tasksRepository.updateTask(filter, newData)
            Logger.info(`Update One tasks Finished`)
            return updateTaskResponse(response,taskUpdated )

        }
        catch (error) {
            Logger.error(`Failed Update One task`)
            return errorHandler(error, response)
        }

    }

}