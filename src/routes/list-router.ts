import { Router } from "express";
import { bookAUnit, getAllList, getById } from "../controller/Booking-conteroller";
import { createReview } from "../controller/review-controller";
import { userMiddlerware } from "../middleware/user-middleware";
const router = Router()

router.route("/all").get(getAllList)
router.route("/:id").get(getById)
router.route("/units").get(bookAUnit)
router.route("/review/:list").post(userMiddlerware ,createReview)

export default router