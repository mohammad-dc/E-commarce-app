"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
exports.con = mysql_1.default.createConnection({
    host: config_1.default.mysql.host,
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    database: config_1.default.mysql.database
});
var connection = exports.con.connect(function (error) {
    if (error)
        throw error;
    console.log('database connected !!!');
});
exports.default = connection;
