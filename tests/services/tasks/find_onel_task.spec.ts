import {TaskService} from "../../../src/services/tasks/service";
import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {taskNotFoundResponse} from "../../../src/domain/responses/tasks/response";
import {response} from "express";
const responses = require("../../../src/domain/responses/tasks/response")

describe("Task Services", () => {
    let taskService: TaskService;
    
    beforeEach(() => {
        taskService = new TaskService();
        
    });

    it('should nor find one task', async () => {
        const taskData = {
            id: "123456",
        };
        jest.spyOn(responses, "taskNotFoundResponse").mockImplementation(() => jest.fn());

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findTask").mockImplementation(async () => undefined);
        await taskService.findOneTask(taskData, response)

        expect(responses.taskNotFoundResponse).toBeCalledTimes(1)

    });

    it('should find one task', async () => {
        const taskData = {
            id: "123456",
        };

        jest.spyOn(responses, "taskFoundResponse").mockImplementation(() => jest.fn());

        const result = {
            success: true,
            message: "Task found",
            data: {
                "_id": "6543a580e1cc78c1e4ddddc2",
                "name": "Niceaaaaa bootcamp",
                "description": "I learned aaa lot",
                "completed": false,
                "createdAt": "2023-11-02T13:34:51.023Z",
                "user": "6543a4eed5d925e4a62d4a4b",
                "__v": 0
            }
        }

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findTask").mockImplementation(async () => result);
        await taskService.findOneTask(taskData, response)

        expect(responses.taskFoundResponse).toBeCalledTimes(1)

    });
});