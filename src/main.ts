import {MongoDBInfrastructure} from "./infrastructures/mongodb/infrastructure";
import {errorHandler} from "./domain/responses/error/response";
const express = require("express");
const cors = require("cors")
const createTask = require("../src/routes/tasks/route")
const dotenv = require("dotenv");
dotenv.config()

const conn = new MongoDBInfrastructure();
conn.getClient();

const app = express();

app.use(cors());

app.use(express.json())

const PORT = process.env.PORT;

app.use("/api/v1/tasks", createTask);
app.use(errorHandler);
app.listen(PORT, console.log("Server running"));


