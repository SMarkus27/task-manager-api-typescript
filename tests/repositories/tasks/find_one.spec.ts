import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {TaskModel} from "../../../src/domain/models/tasks/model";


jest.mock("../../../src/domain/models/tasks/model")
describe("TasksRepository Find Task", () => {
    let tasksRepository: TasksRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        tasksRepository = new TasksRepository();
    });

    it('should find a task', async () => {
        const filter = {
            _id: "5d713995b721c3bb38c1f5d0",
        };

        const projection = {}
        await tasksRepository.findOne(filter, projection);

        expect(TaskModel.findOne).toBeCalledWith(filter, projection)

    });

});