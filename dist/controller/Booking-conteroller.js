"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAllList = exports.bookAUnit = exports.allBooking = exports.editBooking = exports.deleteBooking = exports.BookingaUintAsUser = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../prisma");
const ApiErorr_1 = require("../utils/ApiErorr");
const ApiResponse_1 = require("../utils/ApiResponse");
const type_1 = require("../type");
exports.BookingaUintAsUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { unit } = req.params;
    const parsedData = type_1.BookingSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(401, "data not found");
    }
    const booking = yield prisma_1.client.booking.create({
        data: {
            name: parsedData.data.name,
            date: parsedData.data.date,
            slot: parsedData.data.slot,
            guests: parsedData.data.guests,
            pack: parsedData.data.pack,
            CustomerId: req.userId,
            unitid: unit
        }
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, booking, "Booked a place for You"));
}));
exports.deleteBooking = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.DeleteBookingSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, "Data not Found");
    }
    const booking = yield prisma_1.client.booking.delete({
        where: {
            id: parsedData.data.UniqueId,
        }
    });
    return res
        .status(202)
        .json(new ApiResponse_1.ApiResponse(202, booking, "Successfully deleted a Booking"));
}));
exports.editBooking = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.UpdateBookingSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, "Invalid data");
    }
    const booking = yield prisma_1.client.booking.update({
        where: {
            id: parsedData.data.UniqueId,
            CustomerId: req.user.id
        },
        data: {
            name: parsedData.data.name,
            date: parsedData.data.date,
            slot: parsedData.data.slot,
            guests: parsedData.data.guests,
            pack: parsedData.data.pack
        }
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, booking, "Updated a Booking"));
}));
exports.allBooking = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const BookedByYou = yield prisma_1.client.booking.findMany({
        where: {
            CustomerId: req.user.id
        }
    });
    if (!BookedByYou) {
        throw new ApiErorr_1.ApiError(403, "NO bookings Found");
    }
}));
exports.bookAUnit = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { listId } = req.params;
    const list = yield prisma_1.client.listing.findFirst({
        where: {
            id: listId
        }
    });
    return res
        .json(new ApiResponse_1.ApiResponse(200, { list }, "fatch successfully"));
}));
exports.getAllList = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lists = yield prisma_1.client.listing.findMany();
    return res
        .json(new ApiResponse_1.ApiResponse(200, lists, "fatched successfully"));
}));
exports.getById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const lists = yield prisma_1.client.listing.findUnique({
        where: {
            id: id
        }
    });
    if (!lists) {
        throw new ApiErorr_1.ApiError(400, "not found");
    }
    return res
        .json(new ApiResponse_1.ApiResponse(200, lists, "fatched successfully"));
}));
