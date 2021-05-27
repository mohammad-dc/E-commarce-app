"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = void 0;
var server_sdk_1 = __importDefault(require("@vonage/server-sdk"));
var config_1 = __importDefault(require("../config/config"));
var sendSMS = function (to, text) {
    var nexmo = new server_sdk_1.default({
        apiKey: config_1.default.server.nexmo.publicKey,
        apiSecret: config_1.default.server.nexmo.secretKey,
    });
    var from = 'Kiwi';
    nexmo.message.sendSms(from, to, text, { type: 'unicode' }, function (error, responseData) {
        error ? console.log(error) : console.log(responseData);
    });
};
exports.sendSMS = sendSMS;
