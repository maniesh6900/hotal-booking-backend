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
exports.venderMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiErorr_1 = require("../utils/ApiErorr");
const prisma_1 = require("../prisma");
const venderMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = req.headers["authorization"];
    const token = (header === null || header === void 0 ? void 0 : header.split(" ")[1]) || req.cookies["token"];
    if (!token) {
        res.status(403).json({ message: "token  Unauthorized" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = yield prisma_1.client.user.findUnique({
            where: {
                id: decoded.id
            }
        });
        if ((user === null || user === void 0 ? void 0 : user.role) != "Vender") {
            throw new ApiErorr_1.ApiError(409, "User is not Verify for this function");
        }
        req.userId = user.id;
        next();
    }
    catch (e) {
        res.status(401).json({ message: "function Unauthorized" });
        return;
    }
});
exports.venderMiddleware = venderMiddleware;
