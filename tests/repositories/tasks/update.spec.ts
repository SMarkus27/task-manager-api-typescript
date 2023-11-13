import {TasksRepository} from "@repositories/tasks/repository";
import {TaskModel} from "@domain/models/tasks/model";


jest.mock("../../../src/domain/models/tasks/model")
describe("TasksRepository Update Task", () => {
    let tasksRepository: TasksRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        tasksRepository = new TasksRepository();
    });

    it('should find a task', async () => {
        const filter = {
            _id: "5d713995b721c3bb38c1f5d0",
        };

        const newData = {

                completed: true
        }
        await tasksRepository.updateTask(filter, newData);

        expect(TaskModel.updateOne).toBeCalledWith(filter, newData)

    });

});