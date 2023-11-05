import {TaskService} from "../../../src/services/tasks/service";
import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {response} from "express";
const responses = require("../../../src/domain/responses/tasks/response")

describe("Task Services", () => {
    let taskService: TaskService;
    
    beforeEach(() => {
        taskService = new TaskService();
        
    });

    it('should find all tasks sort by a field', async () => {
        const taskData = {
            sort: "createdAt",
            page: 2,
            limit: 2
        };
        jest.spyOn(responses, "allTaskFoundResponse").mockImplementation(() => jest.fn());
        const result = {
            "success": true,
            "message": "Tasks found",
            "totalItems": 3,
            "pagination": {
                "next": {},
                "prev": {
                    "page": 1,
                    "limit": 2
                }
            },
            "data": [
                {
                    "_id": "6543a580e1cc78c1e4ddddc2",
                    "name": "Niceaaaaa bootcamp",
                    "description": "I learned aaa lot",
                    "completed": false,
                    "createdAt": "2023-11-02T13:34:51.023Z",
                    "user": "6543a4eed5d925e4a62d4a4b",
                    "__v": 0
                }
            ]
        }

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findAllPaginatedTasks").mockImplementation(async () => result);
        await taskService.findAllTasks(taskData, response)

        expect(responses.allTaskFoundResponse).toBeCalledTimes(1)

    });

    it('should find all tasks', async () => {
        const taskData = {

        };
        jest.spyOn(responses, "allTaskFoundResponse").mockImplementation(() => jest.fn());
        const result = {
            "success": true,
            "message": "Tasks found",
            "totalItems": 3,
            "pagination": {
                "next": {},
                "prev": {
                    "page": 1,
                    "limit": 2
                }
            },
            "data": [
                {
                    "_id": "6543a580e1cc78c1e4ddddc2",
                    "name": "Niceaaaaa bootcamp",
                    "description": "I learned aaa lot",
                    "completed": false,
                    "createdAt": "2023-11-02T13:34:51.023Z",
                    "user": "6543a4eed5d925e4a62d4a4b",
                    "__v": 0
                }
            ]
        }

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "findAllPaginatedTasks").mockImplementation(async () => result);
        await taskService.findAllTasks(taskData, response)

        expect(responses.allTaskFoundResponse).toBeCalledTimes(1)

    });
});