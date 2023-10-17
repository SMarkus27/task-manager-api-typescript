import {TasksRepository} from "../../../src/repositories/tasks/repository";
import {TaskModel} from "../../../src/domain/models/tasks/model";

jest.mock("../../../src/domain/models/tasks/model")

describe("TasksRepository Find All Paginated", () => {
    let tasksRepository: TasksRepository;

    beforeEach(() => {
        jest.clearAllMocks();

        tasksRepository = new TasksRepository();
    });
    it('should return zero documents', async ()=> {
        const filter = {
            _id: "5d713995b721c3bb38c1f5d0",
        };
        const sortField = "name";
        const skip = 1;
        const limit = 2;

        TaskModel.countDocuments = jest.fn().mockImplementation( () => null)

        const expected = {
            result: [],
            totalItems: 0
        }

        const result = await tasksRepository.findAllPaginated(filter, sortField, skip, limit);
        expect(result).toEqual(expected)
    });

    it('should return documents sorted', async () =>{
        const filter = {
            _id: "5d713995b721c3bb38c1f5d0",
        };
        const sortField = "name";
        const skip = 1;
        const limit = 2;

        TaskModel.countDocuments = jest.fn().mockImplementation(() => 10)



        const resultData = [
                {
                    createdAt: "2023-10-17T17:52:15.095Z",
                    _id: "652d8fbf6ddf4d8a252efbf8",
                    name: 'Listen podcasts',
                    description: 'Listen podcast to improve the Listen',
                    completed: false,
                    __v: 0
                },
        {
            createdAt: "2023-10-17T17:52:15.095Z",
                _id: "652d915a5e5f163aeee2bf48",
            name: 'Go to gym',
            description: 'go to gym workout',
            completed: false,
            __v: 0
        }
    ]

        TaskModel.find = jest.fn().mockImplementation( () => ({
            sort: jest.fn().mockImplementation(() => ({
                skip: jest.fn().mockImplementation(() => ({
                    limit: jest.fn().mockImplementation(() => resultData)
                }))
            }))
        }))

        const expected = {
            result: resultData,
            totalItems: 10
        }

        const result = await tasksRepository.findAllPaginated(filter, sortField, skip, limit);
        expect(result).toEqual(expected)



    });

});