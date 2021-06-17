"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerRouter = void 0;
var express_1 = __importDefault(require("express"));
var dealer_1 = __importDefault(require("../controllers/dealer"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractDealerJWT_1 = __importDefault(require("../helpers/extractDealerJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var dealer_2 = require("../validations/dealer");
var uploadImage_1 = require("../helpers/uploadImage");
exports.dealerRouter = express_1.default.Router();
//dealer
exports.dealerRouter.get("/api/v1/user/dealer/verify", extractDealerJWT_1.default, dealer_1.default.verifyLogin);
exports.dealerRouter.post("/api/v1/user/dealer/auth/register", uploadImage_1.upload.single("SSN_image"), extractRequest_1.extractRequest(dealer_2.dealerSignupSchema), dealer_1.default.registerDealer);
exports.dealerRouter.post("/api/v1/user/dealer/auth/login", extractRequest_1.extractRequest(dealer_2.dealerLoginSchema), dealer_1.default.loginDealer);
exports.dealerRouter.put("/api/v1/user/dealer/update/:id", extractDealerJWT_1.default, uploadImage_1.upload.single("image"), extractRequest_1.extractRequest(dealer_2.dealerUpdateSchema), dealer_1.default.updateDealer);
exports.dealerRouter.get("/api/v1/user/dealer/get/:id", extractDealerJWT_1.default, dealer_1.default.retrieveDealer);
// admin
exports.dealerRouter.delete("/api/v1/admin/dealer/delete/:id", extractAdminJWT_1.default, dealer_1.default.deleteDealer);
exports.dealerRouter.get("/api/v1/admin/dealer/get/:accepted", extractAdminJWT_1.default, dealer_1.default.getAllDealers);
exports.dealerRouter.put("/api/v1/admin/dealer/active/:id", extractAdminJWT_1.default, dealer_1.default.acceptDealer);
exports.dealerRouter.put("/api/v1/admin/dealer/percentage/:id", extractAdminJWT_1.default, dealer_1.default.changePercentageSales);
