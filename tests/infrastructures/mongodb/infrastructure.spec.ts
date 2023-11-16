import mongoose from "mongoose";
import {MongoDBInfrastructure} from "@infrastructures/mongodb/infrastructure";

describe("MongoDBInfrastructure", () => {
    let mongoClient: MongoDBInfrastructure;

    beforeEach( () => {
        jest.clearAllMocks();

        mongoClient = new MongoDBInfrastructure();
    });


    it('should return a mongo client', async () => {

        mongoose.connect = jest.fn().mockImplementation(async () => {return true});
        await mongoClient.getClient();
        expect(mongoose.connect).toHaveBeenCalledTimes(1)

    });

    it('should return a message error', async () => {
        mongoose.connect = jest.fn().mockImplementation(async () => {
            return Promise.reject("MongoDB Connection Error")});

        await expect(mongoClient.getClient()).rejects.toThrow(new Error("MongoDB Connection Error"))

    });

})