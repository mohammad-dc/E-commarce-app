"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
var mysql_1 = __importDefault(require("mysql"));
var config_1 = __importDefault(require("./config"));
var db_config = {
    host: config_1.default.mysql.host,
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    database: config_1.default.mysql.database,
};
var handleDisconnect = function () {
    exports.con = mysql_1.default.createConnection(db_config);
    exports.con.connect(function (err) {
        if (err) {
            console.log("error when connecting to db:", err);
            setTimeout(handleDisconnect, 2000);
        }
        console.log("database connected successfully");
    });
    exports.con.on("error", function (err) {
        console.log("db error", err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleDisconnect();
        }
        else {
            throw err;
        }
    });
};
exports.default = { handleDisconnect: handleDisconnect };
// export const con = mysql.createConnection({
//     host: config.mysql.host,
//     user: config.mysql.user,
//     password: config.mysql.password,
//     database: config.mysql.database
// });
//  const connection = con.connect((error: Error) => {
//     if(error) throw error
//     console.log('database connected !!!')
//  });
//  export default connection;
