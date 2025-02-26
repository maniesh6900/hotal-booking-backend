"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)()); //give your frontend address here just to make backend more secure
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
const book_routes_1 = __importDefault(require("./routes/book-routes"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const Vender_routes_1 = __importDefault(require("./routes/Vender-routes"));
const list_router_1 = __importDefault(require("./routes/list-router"));
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/vender", Vender_routes_1.default);
app.use("/api/v1/list", list_router_1.default);
app.use("/api/v1/book", book_routes_1.default);
