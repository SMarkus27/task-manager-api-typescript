import { model } from "mongoose";
import { TaskSchema } from "../../schemas/tasks/schema";
export const TaskModel = model("tasks", TaskSchema, process.env.MONGODB_TASK_COLLECTION);
