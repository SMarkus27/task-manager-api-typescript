import {UsersController} from "@controllers/users/controller";

const express = require("express");

const usersRouter = new UsersController()

const router = express.Router();

router.route("/register")
    .post(usersRouter.createUser)

router.route("/login")
    .post(usersRouter.login)

module.exports = router;
