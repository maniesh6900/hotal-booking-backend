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
exports.allUnits = exports.allBooking = exports.ComformBookings = exports.CreateUnit = exports.DeleteList = exports.UpdateList = exports.CreateList = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../prisma");
const ApiErorr_1 = require("../utils/ApiErorr");
const ApiResponse_1 = require("../utils/ApiResponse");
const type_1 = require("../type");
exports.CreateList = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const parsedData = type_1.CreateListSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, parsedData.error.message);
    }
    const list = yield prisma_1.client.listing.create({
        data: {
            name: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.name,
            address: (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.address,
            description: (_c = parsedData.data) === null || _c === void 0 ? void 0 : _c.description,
            price: (_d = parsedData.data) === null || _d === void 0 ? void 0 : _d.price,
            Facilities: (_e = parsedData.data) === null || _e === void 0 ? void 0 : _e.facilities,
            images: (_f = parsedData.data) === null || _f === void 0 ? void 0 : _f.image,
            type: (_g = parsedData.data) === null || _g === void 0 ? void 0 : _g.type,
            VenderId: req.userId
        }
    });
    if (!list) {
        throw new ApiErorr_1.ApiError(500, "server is not able to create new List");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(201, list, "new List created Successfully"));
}));
exports.UpdateList = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.UpdateListSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(200, "data not fount");
    }
    const list = yield prisma_1.client.listing.update({
        where: {
            name: parsedData.data.name,
            VenderId: req.vender.id
        },
        data: {
            name: parsedData.data.name,
            address: parsedData.data.address,
            description: parsedData.data.description,
            price: parsedData.data.price,
            Facilities: parsedData.data.Facilities,
            images: parsedData.data.Image,
            type: parsedData.data.type
        }
    });
    if (!list) {
        throw new ApiErorr_1.ApiError(500, "server is not able to update List");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, list, "List updated Successfully"));
}));
exports.DeleteList = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.Deletelist.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, "Data not found");
    }
    const list = yield prisma_1.client.listing.delete({
        where: {
            id: parsedData.data.uniqueId
        }
    });
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, list, "List deleted successfully"));
}));
exports.CreateUnit = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { unit } = req.params;
    console.log(unit);
    const venderId = req.userId;
    console.log("venderId");
    console.log(venderId);
    const parsedData = type_1.CreateUnitSchema.safeParse(req.body);
    console.log(parsedData === null || parsedData === void 0 ? void 0 : parsedData.data);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(409, "data not found");
    }
    const unint = yield prisma_1.client.units.create({
        data: {
            price: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.price,
            status: (_b = parsedData.data) === null || _b === void 0 ? void 0 : _b.status,
            booking_type: (_c = parsedData.data) === null || _c === void 0 ? void 0 : _c.booking_type,
            ListingId: unit,
            venderId: venderId
        }
    });
    if (!unint) {
        throw new ApiErorr_1.ApiError(500, "server is not able to create new List");
    }
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, unint, "Booked successfully "));
}));
exports.ComformBookings = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.ConformBookingSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, "Invalid data");
    }
    const booking = yield prisma_1.client.booking.update({
        where: {
            id: parsedData.data.uniqueId
        },
        data: {
            status: "confirmed"
        }
    });
    if (!booking) {
        throw new ApiErorr_1.ApiError(500, "Unable to confirm booking");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, booking, "Booking confirmed successfully"));
}));
exports.allBooking = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allBooking = yield prisma_1.client.booking.findMany();
    if (!allBooking) {
        throw new ApiErorr_1.ApiError(404, "No bookings found");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, allBooking, "All bookings fatched successfully"));
}));
exports.allUnits = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUnits = yield prisma_1.client.booking.findMany();
    if (!allUnits) {
        throw new ApiErorr_1.ApiError(404, "No bookings found");
    }
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, allUnits, "All units fatched successfully"));
}));
