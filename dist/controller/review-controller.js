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
exports.createReview = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../prisma");
const ApiErorr_1 = require("../utils/ApiErorr");
const ApiResponse_1 = require("../utils/ApiResponse");
const type_1 = require("../type");
exports.createReview = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parsedData = type_1.ReviewSchema.safeParse(req.body);
    const { list } = req.params;
    console.log(req.userId);
    console.log(list);
    console.log(parsedData.data);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(401, "invalid data");
    }
    const review = yield prisma_1.client.reviews.create({
        data: {
            customerId: req.userId,
            rating: (_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.rating,
            message: parsedData.data.message,
            listingId: list
        }
    });
    console.log(review);
    return res
        .status(200)
        .json(new ApiResponse_1.ApiResponse(200, review, "Review created successfully"));
}));
