import { Schema } from "mongoose"
export const TaskSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add a task name"],
        trim: true,
        maxLength: [20, "Task name can not be more than 20 characters"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        maxLength: [50, "Description can not be more than 50 characters"]
    },
    completed: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }

});