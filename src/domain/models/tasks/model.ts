import { model } from "mongoose";
import { TaskSchema } from "../../schemas/schema";
export const TaskModel = model("tasks", TaskSchema, "xaps");
