"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Server
var PORT = process.env.PORT || 4000;
//DB
var DB_HOST = process.env.DB_HOST || 'localhost';
var DB_NAME = process.env.DB_NAME || 'kiwidb';
var DB_PASSWORD = process.env.DB_PASSWORD || '';
var DB_USER = process.env.DB_USER || 'root';
// JWT
var TOKEN_ADMIN_SECRET_KEY = process.env.TOKEN_ADMIN_SECRET_KEY || '$2y$12$XsKEGjzozG415/mb7MBmxODdAHCD2pr2o60hgTmKbIzMagET1.ir6';
var TOKEN_USER_SECRET_KEY = process.env.TOKEN_USER_SECRET_KEY || '$2y$12$RKeg2ZWFYDl4tfTaUMMHOu.tPnXMRDAmloyL09IWBVLRfZJ0PEyBO';
var TOKEN_ADMIN_ISSURE = process.env.TOKEN_ADMIN_ISSURE || '$2y$12$mObJxFNHvJMsqbSareX7iu9ca11HdIhKpobhFr/3V7smwzyusN4rK';
var TOKEN_USER_ISSURE = process.env.TOKEN_USER_ISSURE || '$2y$12$tAYqrE8tS0W.XU8c8noW.egHUVMGy26Rz5w0.npJXvUtMyQCDwaeO';
// Nexmo
var NEXMO_SECRET_KEY = process.env.NEXMO_SECRET_KEY || '2c0k9yBKivOMdFvb';
var NEXMO_PUBLIC_KEY = process.env.NEXMO_PUBLIC_KEY || 'ec497654';
var server = {
    port: PORT,
    token: {
        adminSecretKey: TOKEN_ADMIN_SECRET_KEY,
        userSecretKey: TOKEN_USER_SECRET_KEY,
        adminIssureKey: TOKEN_ADMIN_ISSURE,
        userIssureKey: TOKEN_USER_ISSURE
    },
    nexmo: {
        secretKey: NEXMO_SECRET_KEY,
        publicKey: NEXMO_PUBLIC_KEY
    }
};
var mysql = {
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    user: DB_USER
};
var config = {
    server: server,
    mysql: mysql
};
exports.default = config;
