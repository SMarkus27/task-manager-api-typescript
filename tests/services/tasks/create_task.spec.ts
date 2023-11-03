import {TaskService} from "../../../src/services/tasks/service";
import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {response} from "express";
const responses = require("../../../src/domain/responses/tasks/response")
// import {createTaskResponse} from ;



describe("TaskService", () => {
    let taskService: TaskService;

    beforeEach(() => {
        taskService = new TaskService();
    });

    it('should create a task', async () => {

        const taskData = {
                name: "Task 1",
                description: "Do it",
                completed: false,
                user: "123456"
        };
        jest.spyOn(responses, "createTaskResponse").mockImplementation(() => jest.fn());
        const result = {...taskData, _id: "111111111", createdAt: new Date()};

        // @ts-ignore
        jest.spyOn(TasksRepository.prototype, "createTask").mockImplementation(async () => result);
        await taskService.createTask(taskData, response)
        expect(responses.createTaskResponse).toBeCalledTimes(1)

    });

    it('should return error', async ()=> {

    });


})