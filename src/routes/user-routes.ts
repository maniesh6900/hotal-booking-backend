import { Router } from "express";
const router = Router()
import {UserSignup, UserSignin} from "../controller/user-controller"

router.route("/signup").post(UserSignup)
router.route("/login").post(UserSignin)

export default router
