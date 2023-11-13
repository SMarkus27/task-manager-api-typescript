import {TaskModel} from "@domain/models/tasks/model";
import {ITasksRepository} from "@core/interfaces/repositories/tasks/interface";
import {
    TaskDataType,
    TaskFilterRepositoryType,
    TaskProjectionType
} from "@domain/types/tasks/type";
export class TasksRepository implements ITasksRepository {

    async createTask(data: TaskDataType){
        return await TaskModel.create(data);
    };

    async findAllPaginatedTasks(filter: TaskFilterRepositoryType, sort: string, skip: number, limit: number){
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
    async findTask(filter: TaskFilterRepositoryType, projection: TaskProjectionType){
        return TaskModel.findOne(filter, projection)
    };
    async updateTask(filter: TaskFilterRepositoryType, newData: TaskDataType){
        return TaskModel.updateOne(filter, newData)
    };

}