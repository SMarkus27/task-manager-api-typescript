import * as mongoose from "mongoose";

export interface IMongoDBInfrastructure {

    getClient(): Promise<mongoose.Mongoose>
}