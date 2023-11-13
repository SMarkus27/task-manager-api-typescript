import {TaskController} from "@controllers/tasks/controller";
import {TaskService} from "@services/tasks/service";


describe("Task Controller", () => {

   let taskController: TaskController;

   beforeEach(async () => {
       taskController = new TaskController();
   });


    it('should create a task', async () => {
        const request = {
            user: {
                _id: "123456"
            },
            body: {
                name: "Task 1",
                description: "Do it",
                completed: false,
            }
        }

        jest.spyOn(TaskService.prototype, "createTask").mockImplementation( async () => {})

        await taskController.createTask(request, Response)
        expect(TaskService.prototype.createTask).toBeCalledTimes(1)
    });

    it('should find one task', async () => {
        const request = {
            params: {
                id: "123456",
            }
        }

        jest.spyOn(TaskService.prototype, "findOneTask").mockImplementation( async () => {})

        await taskController.findOneTask(request, Response)
        expect(TaskService.prototype.findOneTask).toBeCalledTimes(1)
    });

    it('should find all task', async () => {
        const request = {
            query: {
                sort: "createdAt",
                page: 1,
                limit: 5,
            }
        }

        jest.spyOn(TaskService.prototype, "findAllTasks").mockImplementation( async () => {})

        await taskController.findAllTasks(request, Response)
        expect(TaskService.prototype.findAllTasks).toBeCalledTimes(1)
    });

    it('should update one task', async () => {
        const request = {
            user: {
                _id: "123456"
            },
            params: {
                id: "123456",
            },
            body: {
                name: "Task 1",
                description: "Do it",
                completed: true,
            }
        }

        jest.spyOn(TaskService.prototype, "updateTask").mockImplementation( async () => {})

        await taskController.updateTask(request, Response)
        expect(TaskService.prototype.updateTask).toBeCalledTimes(1)
    });
});