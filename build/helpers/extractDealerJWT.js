"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var extractDealerJWT = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.dealerSecretKey, function (error, decoded) {
            if (error) {
                return res.status(404).json({
                    success: false,
                    message: "لا يسمح لك بالدخول!!!",
                    error: error,
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            success: false,
            message: "لا يسمح لك بالدخول!!!",
            error: {},
        });
    }
};
exports.default = extractDealerJWT;
