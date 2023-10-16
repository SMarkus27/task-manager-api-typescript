import { connect } from "mongoose";
import * as mongoose from "mongoose";
import { config } from "dotenv";
import * as process from "process";
import {IMongoDBInfrastructure} from "@core/*/interfaces/infrastructures/mongodb/interface";
config()

export class MongoDBInfrastructure implements IMongoDBInfrastructure {

    async getClient(): Promise<mongoose.Mongoose>{
        try {
            console.log("Connecting to MongoDB")
            const mongoClient = await connect(
                process.env.MONGODB_CONNECTION_STRING,
                {
                    dbName: process.env.MONGODB_DATABASE_NAME,
                })

            return mongoClient
        }
        catch (error) {
            console.log("Something happening")
            throw new Error("MongoDB Connection Error")


        }
    }
}
