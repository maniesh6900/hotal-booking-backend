import { Router } from "express";
const router = Router()
import { userMiddlerware } from "../middleware/user-middleware";
import { allBooking, BookingaUintAsUser, deleteBooking, editBooking } from "../controller/Booking-conteroller";

router.route("/unit/:id").post(userMiddlerware, BookingaUintAsUser)
router.route("/unit/delete").delete(userMiddlerware, deleteBooking)
router.route("/unit/edit").put(userMiddlerware, editBooking)
router.route("/unit/booking").put(userMiddlerware, allBooking)

export default router