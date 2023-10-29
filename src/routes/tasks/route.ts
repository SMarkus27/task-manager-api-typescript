import {TaskController} from "../../controllers/tasks/controller";
const express = require("express");

const taskRouter = new TaskController()

const router = express.Router();
router.route("/").post(taskRouter.createTask).get(taskRouter.findAllTasks)
router.route("/:id").get(taskRouter.findOneTask).put(taskRouter.updateTask)

module.exports = router;
