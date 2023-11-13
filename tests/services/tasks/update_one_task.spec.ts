import {TaskService} from "@services/tasks/service";
import {TasksRepository} from "@repositories/tasks/repository";
import {taskNotFoundResponse} from "@domain/responses/tasks/response";
import {response} from "express";
import {errorHandler} from "@domain/responses/error/response";
const responses = require("../../../src/domain/responses/tasks/response")

jest.mock("../../../src/domain/responses/error/response")
describe("Task Services", () => {
    let taskService: TaskService;
    
    beforeEach(() => {
        taskService = new TaskService();
        
    });

    it('should not find one task', async () => {
        const taskData = {
            newData: {
                name: "task 1",
                description: "Do it",
                completed: true,
            },
            user: "123456789"
        };
        jest.spyOn(responses, "taskNotFoundResponse").mockImplementation(() => jest.fn());

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findTask").mockImplementation(async () => undefined);
        await taskService.updateTask(taskData, response)

        expect(responses.taskNotFoundResponse).toBeCalledTimes(1)

    });

    it('should not authorized update task', async () => {
        const taskData = {
            newData: {
                name: "task 1",
                description: "Do it",
                completed: true,
            },
            user: "123456789"
        };

        jest.spyOn(responses, "taskFoundResponse").mockImplementation(() => jest.fn());

        const result = {
                "_id": "6543a580e1cc78c1e4ddddc2",
                "name": "Niceaaaaa bootcamp",
                "description": "I learned aaa lot",
                "completed": false,
                "createdAt": "2023-11-02T13:34:51.023Z",
                "user": "123456788",
                "__v": 0
        }

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findTask").mockImplementation(async () => result);
        await taskService.updateTask(taskData, response)
        expect(errorHandler).toBeCalledTimes(1)

    });


    it('should update task', async () => {
        const taskData = {
            newData: {
                name: "task 1",
                description: "Do it",
                completed: true,
            },
            user: "123456789"
        };

        jest.spyOn(responses, "updateTaskResponse").mockImplementation(() => jest.fn());

        const result = {
                "_id": "6543a580e1cc78c1e4ddddc2",
                "name": "Niceaaaaa bootcamp",
                "description": "I learned aaa lot",
                "completed": false,
                "createdAt": "2023-11-02T13:34:51.023Z",
                "user": "123456789",
                "__v": 0
        }

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findTask").mockImplementation(async () => result);

        const updateResult = {
            modifiedCount:  1,
            acknowledged: true,
            matchedCount: 1,
            upsertedCount: 0,
            upsertedId: "1111111"
        }
        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "updateTask").mockImplementation(async () => updateResult);
        await taskService.updateTask(taskData, response)
        expect(responses.updateTaskResponse).toBeCalledTimes(1)

    });
});