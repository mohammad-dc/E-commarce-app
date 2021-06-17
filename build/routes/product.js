"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
var express_1 = __importDefault(require("express"));
var product_1 = __importDefault(require("../controllers/product"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractCustomerJWT_1 = __importDefault(require("../helpers/extractCustomerJWT"));
var extractDealerJWT_1 = __importDefault(require("../helpers/extractDealerJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var product_2 = require("../validations/product");
var uploadImage_1 = require("../helpers/uploadImage");
exports.productRouter = express_1.default.Router();
// dealer
exports.productRouter.post("/api/v1/user/dealer/product/create", extractDealerJWT_1.default, uploadImage_1.upload.single("image"), extractRequest_1.extractRequest(product_2.ProductAddSchema), product_1.default.addProduct);
exports.productRouter.put("/api/v1/user/dealer/product/update/:id", extractDealerJWT_1.default, uploadImage_1.upload.single("image"), extractRequest_1.extractRequest(product_2.ProductUpdateSchema), product_1.default.updateProducts);
exports.productRouter.delete("/api/v1/user/dealer/product/delete/:id", extractDealerJWT_1.default, product_1.default.deleteProduct);
exports.productRouter.get("/api/v1/user/dealer/product/get/:dealer_id/:limit?", extractDealerJWT_1.default, product_1.default.getAllDealerProducts);
//admin
exports.productRouter.delete("/api/v1/admin/product/delete/:id", extractAdminJWT_1.default, product_1.default.deleteProduct);
exports.productRouter.get("/api/v1/admin/product/get/:limit?", extractAdminJWT_1.default, product_1.default.getAllProducts);
//customer
exports.productRouter.get("/api/v1/user/customer/product/search/:search_name/:limit?", extractCustomerJWT_1.default, product_1.default.searchProduct);
exports.productRouter.get("/api/v1/user/customer/product/get/:limit?", extractCustomerJWT_1.default, product_1.default.getAllProducts);
