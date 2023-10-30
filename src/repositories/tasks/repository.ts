import {TaskModel} from "../../domain/models/tasks/model";
import {ITasksRepository} from "../../core/interfaces/repositories/tasks/interface";
export class TasksRepository implements ITasksRepository {

    async createTask(data: object){
        return await TaskModel.create(data);
    };

    async findAllPaginatedTasks(filter: object, sort: string, skip: number, limit: number){
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
    async findTask(filter: object, projection: object){
        return TaskModel.findOne(filter, projection)
    };
    async updateTask(filter: object, newData: object){
        return TaskModel.updateOne(filter, newData)
    };

}