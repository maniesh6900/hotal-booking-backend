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
exports.UserSignin = exports.UserSignup = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const index_1 = require("../prisma/index");
const ApiErorr_1 = require("../utils/ApiErorr");
const ApiResponse_1 = require("../utils/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const type_1 = require("../type");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.UserSignup = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parsdeData = type_1.UserSchema.safeParse(req.body);
    if (!parsdeData.success) {
        throw new ApiErorr_1.ApiError(400, "Not found Data ");
    }
    const exiesteduser = yield index_1.client.user.findFirst({
        where: {
            name: (_a = parsdeData.data) === null || _a === void 0 ? void 0 : _a.name
        }
    });
    if (exiesteduser) {
        throw new ApiErorr_1.ApiError(400, "User Already Existed");
    }
    const salt = bcrypt_1.default.genSaltSync(10);
    const hashedPassword = bcrypt_1.default.hashSync(parsdeData.data.password, salt);
    const user = yield index_1.client.user.create({
        data: {
            email: parsdeData.data.email,
            password: hashedPassword,
            name: parsdeData.data.name,
            role: parsdeData.data.role
        }
    });
    return res
        .status(201)
        .json(new ApiResponse_1.ApiResponse(201, user, "new User Created successfully"));
}));
exports.UserSignin = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = type_1.UserSigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        throw new ApiErorr_1.ApiError(400, "Data not found");
    }
    const user = yield index_1.client.user.findFirst({
        where: {
            email: parsedData.data.email
        }
    });
    if (!user) {
        throw new ApiErorr_1.ApiError(401, "User with this name is not found or exists");
    }
    const password = bcrypt_1.default.compare(parsedData.data.password, user.password);
    if (!password) {
        throw new ApiErorr_1.ApiError(401, "Password is incorrect");
    }
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email
    }, process.env.ACCESS_TOKEN_SECRET);
    return res
        .status(200)
        .cookie("token", token, { httpOnly: true, secure: true })
        .json(new ApiResponse_1.ApiResponse(200, Object.assign(Object.assign({}, user), { token: token }), "User signed in successfully"));
}));
