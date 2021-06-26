"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var signCustomerJWT_1 = __importDefault(require("../helpers/signCustomerJWT"));
var db_1 = require("../config/db");
var verifyLogin = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (token) {
            var decodeToken = jwt_decode_1.default(token);
            var query = "SELECT ID, email, password, name, address, phone, image FROM customer WHERE email='" + decodeToken.email + "'";
            db_1.con.query(query, function (error, results, fields) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    });
                }
                return res.status(200).json({ success: true, results: results[0] });
            });
        }
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "حدث خطأ ما, يرجى المحاولة لاحقا" });
    }
};
var registerUser = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password, name = _a.name, address = _a.address, phone = _a.phone;
    var query = "INSERT INTO customer (email, password, name, address, phone, image) VALUES (\"" + email + "\", \"" + password + "\", \"" + name + "\", \"" + address + "\", \"" + phone + "\", \"No image\")";
    try {
        db_1.con.query("SELECT ID FROM customer WHERE email=\"" + email + "\"", function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else if (results) {
                if (results.length !== 0) {
                    return res.status(400).json({
                        success: false,
                        message: "هذا الايميل مستخدم بالفعل",
                    });
                }
                else {
                    db_1.con.query(query, function (error, results, fields) {
                        if (error) {
                            return res.status(500).json({
                                success: false,
                                message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                                error: error,
                            });
                        }
                        else if (results) {
                            return res.status(201).json({
                                success: true,
                                message: "تم تسجيل الدخول بنجاح",
                            });
                        }
                    });
                }
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var loginUser = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    var query = "SELECT ID, email, password, name, address, phone, image FROM customer WHERE email=\"" + email + "\" AND password=\"" + password + "\"";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "الايميل او كلمة السر خطأ",
                    error: error,
                });
            }
            if (results) {
                signCustomerJWT_1.default(results[0], function (_error, token) {
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
                            message: "تم تسجيل الدخول بنجاح",
                            result: results[0],
                            token: token,
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var getAllUsers = function (req, res, next) {
    var query = "SELECT ID, email, password, name, address, phone, image FROM customer";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (results) {
                return res.status(200).json({
                    success: true,
                    results: results,
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var updateUser = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password, name = _a.name, address = _a.address, phone = _a.phone;
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var id = req.params.id;
    var query_select = "SELECT image FROM customer WHERE ID=" + id;
    var query = "UPDATE customer SET email=\"" + email + "\", password=\"" + password + "\", name=\"" + name + "\", address=\"" + address + "\", phone=\"" + phone + "\" " + (req.file ? ", image=\"" + image + "\"" : "") + " WHERE ID=" + id;
    try {
        // if (req.file) {
        //   con.query(query_select, (error: Error, results: any, fields: any) => {
        //     if (error) throw error;
        //     if (results[0].image !== "No image") {
        //       fs.unlink(`uploads/${results[0].image}`, (error) => {
        //         if (error) throw error;
        //       });
        //     }
        //   });
        // }
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (results) {
                return res.status(200).json({
                    success: true,
                    message: "تم التعديل بنجاح",
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var retrieveUser = function (req, res, next) {
    var id = req.params.id;
    var query = "SELECT ID, email, password, name, address, phone, image FROM customer WHERE ID=" + id;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (results) {
                return res.status(200).json({
                    success: true,
                    results: results[0],
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var deleteUser = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM customer WHERE ID=" + id;
    var query_image = "SELECT image FROM customer WHERE ID=" + id;
    try {
        // if (req.file) {
        //   con.query(query_image, (error: Error, results: any, fields: any) => {
        //     if (error) throw error;
        //     if (results[0].image !== "No image") {
        //       fs.unlink(`uploads/${results[0].image}`, (error) => {
        //         if (error) throw error;
        //       });
        //     }
        //   });
        // }
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (results) {
                return res.status(200).json({
                    success: true,
                    message: "تم الحذف بنجاح",
                });
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var getUsersCount = function (req, res, next) {
    var month = req.params.month;
    var query = "SELECT COUNT(ID) AS count FROM customer WHERE month(created_at)=" + month;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما يرجى المحاولة فيما بعد",
                    e_message: error.message,
                    error: error,
                });
            }
            return res.status(200).json({
                success: true,
                results: results,
            });
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما يرجى المحاولة فيما بعد",
            error: e,
        });
    }
};
exports.default = {
    verifyLogin: verifyLogin,
    registerUser: registerUser,
    loginUser: loginUser,
    updateUser: updateUser,
    retrieveUser: retrieveUser,
    deleteUser: deleteUser,
    getAllUsers: getAllUsers,
    getUsersCount: getUsersCount,
};
