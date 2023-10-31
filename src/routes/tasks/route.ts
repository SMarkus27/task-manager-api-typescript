import {TaskController} from "../../controllers/tasks/controller";
import {UsersService} from "../../services/users/service";
const express = require("express");

const taskRouter = new TaskController();
const userService = new UsersService();

const router = express.Router();

router.route("/")
    .post(userService.authentication, taskRouter.createTask)
    .get(taskRouter.findAllTasks)

router.route("/:id")
    .get(taskRouter.findOneTask)
    .put(userService.authentication, taskRouter.updateTask)

module.exports = router;
