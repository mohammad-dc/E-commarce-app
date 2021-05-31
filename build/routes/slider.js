"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliderRouter = void 0;
var express_1 = __importDefault(require("express"));
var slider_1 = __importDefault(require("../controllers/slider"));
var extractAdminJWT_1 = __importDefault(require("../helpers/extractAdminJWT"));
var extractUserJWT_1 = __importDefault(require("../helpers/extractUserJWT"));
var extractRequest_1 = require("../helpers/extractRequest");
var slider_2 = require("../validations/slider");
var uploadImage_1 = require("../helpers/uploadImage");
exports.sliderRouter = express_1.default.Router();
//admin
exports.sliderRouter.post("/api/v1/admin/slider/add", extractAdminJWT_1.default, uploadImage_1.upload.single("image"), extractRequest_1.extractRequest(slider_2.SliderSchema), slider_1.default.addSliderImage);
exports.sliderRouter.put("/api/v1/admin/slider/update/:id", extractAdminJWT_1.default, uploadImage_1.upload.single("image"), extractRequest_1.extractRequest(slider_2.SliderSchema), slider_1.default.updateSliderImage);
exports.sliderRouter.get("/api/v1/admin/slider/get", extractAdminJWT_1.default, slider_1.default.getAllSliderImages);
exports.sliderRouter.delete("/api/v1/admin/slider/delete/:id", extractAdminJWT_1.default, slider_1.default.deleteSliderImage);
//customer
exports.sliderRouter.get("/api/v1/user/customer/slider/get", extractUserJWT_1.default, slider_1.default.getAllSliderImages);
