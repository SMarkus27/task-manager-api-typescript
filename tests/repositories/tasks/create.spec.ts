import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {TaskModel} from "../../../src/domain/models/tasks/model";


jest.mock("../../../src/domain/models/tasks/model")
describe("TasksRepository Create Task", () => {
    let tasksRepository: TasksRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        tasksRepository = new TasksRepository();
    });

    it('should create a task', async () => {
        const taskOne = {
            name: "Make coffee",
            description: "Make coffee to work"
        };

        await tasksRepository.createTask(taskOne);

        expect(TaskModel.create).toBeCalledWith(taskOne)

    });

});