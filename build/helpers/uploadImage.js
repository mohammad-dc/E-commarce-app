"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, "kiwi-" + Date.now() + path_1.default.extname(file.originalname));
    }
});
var fileFilter = function (req, file, cb) {
    cb(null, true);
};
exports.upload = multer_1.default({
    storage: storage,
    fileFilter: fileFilter,
});
