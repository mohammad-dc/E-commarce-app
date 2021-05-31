"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = __importDefault(require("express"));
var admin_1 = __importDefault(require("../controllers/admin"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var admin_2 = require("../validations/admin");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post("/api/v1/admin/auth/login", extractRequest_1.extractRequest(admin_2.AdminSchema), admin_1.default.login);
exports.adminRouter.put("/api/v1/admin/update", extractAdminJWT_1.default, extractRequest_1.extractRequest(admin_2.AdminSchema), admin_1.default.updateAdmin);
