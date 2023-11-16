import {TaskModel} from "@domain/models/tasks/model";
import {ITasksRepository} from "@core/interfaces/repositories/tasks/interface";
import {
    TaskDataType,
    TaskFilterRepositoryType,
    TaskProjectionType
} from "@domain/types/tasks/type";
import {Logger} from "@services/traceback/service";
export class TasksRepository implements ITasksRepository {

    async createTask(data: TaskDataType){
        Logger.info(`Receiving task info from create task`);
        return await TaskModel.create(data);
    };

    async findAllPaginatedTasks(filter: TaskFilterRepositoryType, sort: string, skip: number, limit: number){
        Logger.info(`Receiving task info from find all tasks`);

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
        Logger.info(`Receiving task info from find one task`);
        return TaskModel.findOne(filter, projection);
    };
    async updateTask(filter: TaskFilterRepositoryType, newData: TaskDataType){
        Logger.info(`Receiving task info from update one task`);
        return TaskModel.updateOne(filter, newData);
    };

}