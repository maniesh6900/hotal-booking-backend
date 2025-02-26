import { Router } from "express";
import { venderMiddleware } from "../middleware/vender-middleware";
import { CreateList, UpdateList ,DeleteList, CreateUnit, ComformBookings, allBooking, allUnits, } from "../controller/vender-controller";

const router = Router()

router.route("/list/create").post(venderMiddleware, CreateList )
router.route("/list/update").put(venderMiddleware, UpdateList )
router.route("/list/delete").delete(venderMiddleware, DeleteList )
router.route("/unit/:unit").post(venderMiddleware, CreateUnit)
router.route("/Booking/conform").put(venderMiddleware, ComformBookings)
router.route("/Bookings").get(venderMiddleware, allBooking)
router.route("/units").get(venderMiddleware, allUnits)



export default router