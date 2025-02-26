"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = exports.ConformBookingSchema = exports.CreateUnitSchema = exports.Deletelist = exports.UpdateListSchema = exports.CreateListSchema = exports.UpdateBookingSchema = exports.DeleteBookingSchema = exports.BookingSchema = exports.UserSigninSchema = exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    password: zod_1.default.string(),
    email: zod_1.default.string().email(),
    name: zod_1.default.string(),
    role: zod_1.default.enum(["Customer", "Admin", "Vender"])
});
exports.UserSigninSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string()
});
exports.BookingSchema = zod_1.default.object({
    name: zod_1.default.string(),
    date: zod_1.default.string(),
    guests: zod_1.default.number(),
    price: zod_1.default.number(),
    slot: zod_1.default.enum(["Morning", "Afternoon", "Evening", "Night"]),
    pack: zod_1.default.enum(["Gold", "Platinum"])
});
exports.DeleteBookingSchema = zod_1.default.object({
    UniqueId: zod_1.default.string(),
    name: zod_1.default.string()
});
exports.UpdateBookingSchema = zod_1.default.object({
    UniqueId: zod_1.default.string(),
    name: zod_1.default.string(),
    date: zod_1.default.string(),
    guests: zod_1.default.number(),
    price: zod_1.default.number(),
    slot: zod_1.default.enum(["Morning", "Afternoon", "Evening", "Night"]),
    pack: zod_1.default.enum(["Gold", "Platinum"])
});
exports.CreateListSchema = zod_1.default.object({
    name: zod_1.default.string(),
    address: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    facilities: zod_1.default.string(),
    image: zod_1.default.string().url(),
    type: zod_1.default.enum(["Hotal", "Restaurant", "Both"])
});
exports.UpdateListSchema = zod_1.default.object({
    name: zod_1.default.string(),
    address: zod_1.default.string(),
    description: zod_1.default.string(),
    price: zod_1.default.number(),
    Facilities: zod_1.default.string(),
    Image: zod_1.default.string().url(),
    type: zod_1.default.enum(["Hotal", "Restaurant", "Both"])
});
exports.Deletelist = zod_1.default.object({
    uniqueId: zod_1.default.string(),
});
exports.CreateUnitSchema = zod_1.default.object({
    booking_type: zod_1.default.enum(["Single", "Double", "Triple", "Family"]),
    price: zod_1.default.number(),
    status: zod_1.default.enum(["Available", "Occupied", "Maintenance"])
});
exports.ConformBookingSchema = zod_1.default.object({
    uniqueId: zod_1.default.string()
});
exports.ReviewSchema = zod_1.default.object({
    rating: zod_1.default.enum(["1", "2", "3", "4", "5"]),
    message: zod_1.default.string()
});
