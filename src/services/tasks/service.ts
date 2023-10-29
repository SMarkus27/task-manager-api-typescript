import {TasksRepository} from "../../repositories/tasks/repository";
import {calculateEndIndex, calculateSkip, paginationResult} from "../../utils/utils";

export class TaskService {

    constructor(private readonly tasksRepository: TasksRepository) {
        this.tasksRepository = new TasksRepository();
    }

    async createTask(taskData: object, res) {
        const result= await this.tasksRepository.createTask(taskData);

        return res.status(200).json({
            success: true,
            data: result
        })

    }

    async findAllTasks(taskData, res) {
        const sort = taskData["sort"]
        const page = +taskData["page"] || 1;
        const limit = +taskData["limit"] || 10;

        const skip = calculateSkip(page, limit);
        const endIndex = calculateEndIndex(page, limit);
        const {result, totalItems} = await this.tasksRepository.findAllPaginated({}, sort, skip, limit)
        const pagination = paginationResult(page, limit, endIndex, skip, totalItems)


        return res.status(200).json({
            success: true,
            message: "Tasks found",
            totalItems,
            pagination,
            result
        })
    }


    async findOneTask(taskData: object, res) {
        const taskId = taskData["id"];

        const filter = {_id: taskId}
        const projection = {_id:0, __v:0}
        const taskResult = await this.tasksRepository.findOne(filter,projection)

        if (!taskResult) {

            return res.status(404).json({
                success: false,
                message: "Task not found",
                data: []
            })

        }

        return res.status(200).json({
            success: false,
            message: "Task found",
            result:  taskResult
        })

    }

    async updateTask(taskData, res) {
        const newData = taskData["newData"]
        console.log(taskData)
        const taskId = taskData["id"]

        const filter = {_id: taskId}
        const projection = {_id:0, __v:0}
        const result = await this.tasksRepository.findOne(filter,projection)

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            })
        }

        const taskUpdated = await this.tasksRepository.update(filter, newData)

        if (taskUpdated.modifiedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "Task updated",
            })
        }
        return res.status(200).json({
            success: false,
            message: "Task not updated",
        })
    }
}