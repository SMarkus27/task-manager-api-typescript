import {TasksRepository} from "../../repositories/tasks/repository";
import {calculateEndIndex, calculateSkip, paginationResult} from "../../utils/utils";

export class TaskService {

    constructor(private readonly tasksRepository: TasksRepository) {
        this.tasksRepository = new TasksRepository();
    }

    async createTask(req, res, next) {
        const data = req["data"]

        const task = await this.tasksRepository.createTask(data);

        return {
            success: true,
            message: "Task Created",
            result: task
        }
    }

    async findAllTasks(req, res, next) {
        const data = req["data"]

        const sort = data["sort"]
        const page = data["page"]
        const limit = data["limit"]


        const skip = calculateSkip(page, limit);
        const endIndex = calculateEndIndex(page, limit);

        const {result, totalItems} = await this.tasksRepository.findAllPaginated({}, sort, skip, limit)

        const pagination = paginationResult(page, limit, endIndex, skip, totalItems["totalItems"])


        return {
            success: false,
            message: "Tasks found",
            totalItems,
            pagination,
            result
        }
    }


    async findOneTask(req, res, next) {
        const data = req["data"]

        const taskId = data["id"]

        const filter = {_id: taskId}
        const projection = {_id:0, __v:0}
        const taskResult = await this.tasksRepository.findOne(filter,projection)

        if (!taskResult) {
            return {
                success: false,
                message: "Task not found",
                result:  taskResult
            }
        }

        return {
            success: false,
            message: "Task found",
            result:  taskResult
        }

    }

    async updateTask(req, res, next) {
        const data = req["data"]
        const newData = req["newData"]

        const taskId = data["id"]

        const filter = {_id: taskId}
        const projection = {_id:0, __v:0}
        const result = await this.tasksRepository.findOne(filter,projection)

        if (!result) {
            return {
                success: false,
                message: "Task not found",
            }
        }

        const taskUpdated = await this.tasksRepository.update(filter, newData)

        if (taskUpdated.modifiedCount > 0) {
            return {
                success: true,
                message: "Task updated",
            }
        }
        return {
            success: false,
            message: "Task not updated",
        }
    }
}