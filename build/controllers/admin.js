"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var signAdminJWT_1 = __importDefault(require("../helpers/signAdminJWT"));
var universal_cookie_1 = __importDefault(require("universal-cookie"));
var login = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    var query = "SELECT ID, email, password FROM admin WHERE email='" + email + "' AND password='" + password + "'";
    var cookies = new universal_cookie_1.default();
    db_1.con.query(query, function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                success: false,
                message: "الايميل او كلمة السر خطأ",
                error: error,
            });
        }
        signAdminJWT_1.default(results[0], function (_error, token) {
            if (_error) {
                return res.status(500).json({
                    success: false,
                    message: "الايميل او كلمة السر خطأ",
                    error: _error,
                });
            }
            else if (token) {
                cookies.set("token", token, {
                    expires: new Date(0),
                    path: "/",
                    domain: "http://localhost:5500",
                    httpOnly: false,
                    secure: false,
                });
                return res.status(200).json({
                    success: true,
                    message: "تم تسجيل الدخول بنجاح",
                    token: token,
                });
            }
        });
    });
};
var updateAdmin = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    var query = "UPDATE admin SET email=\"" + email + "\", password=\"" + password + "\"";
    db_1.con.query(query, function (error, results, fields) {
        var admin = { email: email, password: password };
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ, يرجى المحاولة فيما بعد",
                error: error,
            });
        }
        else if (results) {
            signAdminJWT_1.default(admin, function (_error, token) {
                if (_error) {
                    return res.status(400).json({
                        success: false,
                        message: "الايميل او كلمة السر خطأ",
                        error: _error,
                    });
                }
                else if (token) {
                    return res.status(200).json({
                        success: true,
                        message: "تم التعديل بنجاح",
                        token: token,
                    });
                }
            });
        }
    });
};
exports.default = { login: login, updateAdmin: updateAdmin };
