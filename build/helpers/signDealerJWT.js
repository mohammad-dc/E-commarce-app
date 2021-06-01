"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var signDealerJWT = function (admin, callback) {
    try {
        jsonwebtoken_1.default.sign({
            email: admin.email,
        }, config_1.default.server.token.dealerSecretKey, {
            issuer: config_1.default.server.token.dealerIssuerKey,
            algorithm: "HS256",
            expiresIn: "7d",
        }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        callback(error, null);
    }
};
exports.default = signDealerJWT;
