"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privacyRouter = void 0;
var express_1 = __importDefault(require("express"));
var privacy_1 = __importDefault(require("../controllers/privacy"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var privacy_2 = require("../validations/privacy");
exports.privacyRouter = express_1.default.Router();
//admin
exports.privacyRouter.post("/api/v1/admin/privacy/create", extractAdminJWT_1.default, extractRequest_1.extractRequest(privacy_2.privacySchema), privacy_1.default.createPrivacy);
exports.privacyRouter.put("/api/v1/admin/privacy/update", extractAdminJWT_1.default, extractRequest_1.extractRequest(privacy_2.privacySchema), privacy_1.default.updatePrivacy);
exports.privacyRouter.get("/api/v1/admin/privacy/get", extractAdminJWT_1.default, privacy_1.default.getPrivacy);
//customer
exports.privacyRouter.get("/api/v1/user/privacy/get", privacy_1.default.getPrivacy);
