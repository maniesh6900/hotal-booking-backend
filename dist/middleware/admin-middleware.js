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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiErorr_1 = require("../utils/ApiErorr");
const prisma_1 = require("../prisma");
const adminMiddlware = function (req, _, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
            if (!token) {
                throw new ApiErorr_1.ApiError(400, "unauthorized Token");
            }
            const decorder = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const admin = yield prisma_1.client.user.findFirst({
                where: {
                    id: decorder.at(5).id
                }
            });
            if (!admin) {
                throw new ApiErorr_1.ApiError(405, "not a verify User");
            }
            if (admin.role !== "Admin") {
                throw new ApiErorr_1.ApiError(405, "User is not a Vender");
            }
            req.admin = admin;
            next();
        }
        catch (error) {
            console.error(error);
            throw new ApiErorr_1.ApiError(405, `middlerware failed with the error ${error} `);
        }
    });
};
exports.adminMiddlware = adminMiddlware;
