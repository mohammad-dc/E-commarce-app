"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var customer_1 = __importDefault(require("../controllers/customer"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractUserJWT_1 = __importDefault(require("../helpers/extractUserJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var user_1 = require("../validations/user");
var uploadImage_1 = require("../helpers/uploadImage");
exports.userRouter = express_1.default.Router();
//user
exports.userRouter.get("/api/v1/user/customer/verify", extractUserJWT_1.default, customer_1.default.verifyLogin);
exports.userRouter.post("/api/v1/user/customer/auth/register", extractRequest_1.extractRequest(user_1.userSignupSchema), customer_1.default.registerUser);
exports.userRouter.post("/api/v1/user/customer/auth/login", extractRequest_1.extractRequest(user_1.userLoginSchema), customer_1.default.loginUser);
exports.userRouter.put("/api/v1/user/customer/update/:id", extractUserJWT_1.default, extractRequest_1.extractRequest(user_1.userUpdateSchema), extractUserJWT_1.default, uploadImage_1.upload.single("image"), customer_1.default.updateUser);
exports.userRouter.get("/api/v1/user/customer/get/:id", extractUserJWT_1.default, customer_1.default.retrieveUser);
// admin
exports.userRouter.delete("/api/v1/admin/customer/delete/:id", extractAdminJWT_1.default, customer_1.default.deleteUser);
exports.userRouter.get("/api/v1/admin/customer/get", extractAdminJWT_1.default, customer_1.default.getAllUsers);
