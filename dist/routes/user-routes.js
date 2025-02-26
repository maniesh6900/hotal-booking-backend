"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controller/user-controller");
router.route("/signup").post(user_controller_1.UserSignup);
router.route("/login").post(user_controller_1.UserSignin);
exports.default = router;
