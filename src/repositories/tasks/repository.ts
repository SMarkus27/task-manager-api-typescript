import {TaskModel} from "../../domain/models/tasks/model";
import {ITasksRepository} from "../../core/interfaces/repositories/tasks/interface";
import {TaskDataType, TaskFilterType, TaskProjectionType} from "../../domain/types/tasks/type";
export class TasksRepository implements ITasksRepository {

    async createTask(data: TaskDataType){
        return await TaskModel.create(data);
    };

    async findAllPaginatedTasks(filter: TaskFilterType, sort: string, skip: number, limit: number){
        let result;

        const totalItems = await TaskModel.countDocuments(filter);

        if (!totalItems) {
            return {
                result:[],
                totalItems: 0
            }
        }

        result =  TaskModel.find(filter)
        result = await result.sort(sort).skip(skip).limit(limit);

        return {
            result:result,
            totalItems: totalItems
        }

    };
    async findTask(filter: TaskFilterType, projection: TaskProjectionType){
        return TaskModel.findOne(filter, projection)
    };
    async updateTask(filter: TaskFilterType, newData: TaskDataType){
        return TaskModel.updateOne(filter, newData)
    };

}