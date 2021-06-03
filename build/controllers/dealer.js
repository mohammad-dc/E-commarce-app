"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var jwt_decode_1 = __importDefault(require("jwt-decode"));
var signDealerJWT_1 = __importDefault(require("../helpers/signDealerJWT"));
var sendSMS_1 = require("../helpers/sendSMS");
var db_1 = require("../config/db");
var verifyLogin = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    try {
        if (token) {
            var decodeToken = jwt_decode_1.default(token);
            var query = "SELECT ID, email, password, name, type, address, phone, image, percentage_sales FROM dealer WHERE email='" + decodeToken.email + "'";
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
var registerDealer = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password, name = _a.name, type = _a.type, address = _a.address, phone = _a.phone;
    var SSN_image = "kiwi" + req.file.path.split("kiwi")[1];
    var query = "INSERT INTO dealer (email, password, name, type, address, phone, image, SSN_image, percentage_sales, accepted) VALUES (\"" + email + "\", \"" + password + "\", \"" + name + "\", \"" + type + "\", \"" + address + "\", \"" + phone + "\", \"No image\", \"" + SSN_image + "\", 0, false)";
    try {
        db_1.con.query("SELECT ID FROM dealer WHERE email=\"" + email + "\"", function (error, results, fields) {
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
                                message: "شكرا لك سيدي, سيتم التواصل معك في حال تم تأكيد الحساب",
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
var loginDealer = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password;
    var query = "SELECT ID, email, password, name, type, address, phone, image, percentage_sales, accepted FROM dealer WHERE email=\"" + email + "\" AND password=\"" + password + "\"";
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
                if (results[0].accepted) {
                    signDealerJWT_1.default(results[0], function (_error, token) {
                        if (_error) {
                            return res.status(500).json({
                                success: false,
                                message: "الايميل او كلمة السر خطأ",
                                error: _error,
                            });
                        }
                        else if (token) {
                            return res.status(200).json({
                                success: true,
                                message: "تم تسجيل الدخول بنجاح",
                                dealer: results[0],
                                token: token,
                            });
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        success: false,
                        message: "هذا الحساب ليس مفعلا بعد",
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
var updateDealer = function (req, res, next) {
    var _a = req.body, email = _a.email, password = _a.password, name = _a.name, address = _a.address, phone = _a.phone;
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var id = req.params.id;
    var query_image = "SELECT image FROM dealer WHERE ID=" + id;
    var query = "UPDATE dealer SET email=\"" + email + "\", password=\"" + password + "\", name=\"" + name + "\", address=\"" + address + "\", phone=\"" + phone + "\", image=\"" + image + "\" WHERE ID=" + id;
    try {
        if (req.file) {
            db_1.con.query(query_image, function (error, results, fields) {
                if (error)
                    throw error;
                if (results[0].image !== "No image") {
                    fs_1.default.unlink("uploads/" + results[0].image, function (error) {
                        if (error)
                            throw error;
                    });
                }
            });
        }
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
var retrieveDealer = function (req, res, next) {
    var id = req.params.id;
    var query = "SELECT ID, email, password, name, type, address, phone, image, percentage_sales FROM dealer WHERE ID=" + id;
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
var getAllDealers = function (req, res, next) {
    var accepted = req.params.accepted;
    var isTrueSet = "true";
    var query = "SELECT ID, email, password, name, type, address, phone, image, SSN_image, percentage_sales, accepted FROM dealer " + (accepted !== "all" ? "WHERE accepted=" + (isTrueSet === accepted) : "");
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
var deleteDealer = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM dealer WHERE ID=" + id;
    var query_image = "SELECT image, SSN_image FROM dealer WHERE ID=" + id;
    try {
        db_1.con.query(query_image, function (error, results) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (results) {
                if (results[0].image !== "No image") {
                    fs_1.default.unlink("uploads/" + results[0].image, function (error) {
                        if (error)
                            throw error;
                    });
                    fs_1.default.unlink("uploads/" + results[0].SSN_image, function (error) {
                        if (error)
                            throw error;
                    });
                }
            }
        });
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
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error,
        });
    }
};
var acceptDealer = function (req, res, next) {
    var id = req.params.id;
    var query = "UPDATE dealer SET accepted=true WHERE ID=" + id;
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
                db_1.con.query("SELECT phone FROM dealer WHERE ID=" + id, function (error, results, fields) {
                    if (error)
                        throw error;
                    console.log(results[0].phone);
                    sendSMS_1.sendSMS(results[0].phone, "تم تفيل حسابك سيدي, يمكنك الان تسجيل الدخول للتطبيق, مع تحيات فريق كيوي لك");
                });
                return res.status(200).json({
                    success: true,
                    message: "تم تفعيل الحساب بنجاح",
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
var changePercentageSales = function (req, res, next) {
    var percentage_sales = req.body.percentage_sales;
    var id = req.params.id;
    var query = "UPDATE dealer SET percentage_sales=" + percentage_sales + " WHERE ID=" + id;
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
                    message: "تم تحديث النسبة",
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
exports.default = {
    verifyLogin: verifyLogin,
    registerDealer: registerDealer,
    loginDealer: loginDealer,
    updateDealer: updateDealer,
    retrieveDealer: retrieveDealer,
    getAllDealers: getAllDealers,
    deleteDealer: deleteDealer,
    acceptDealer: acceptDealer,
    changePercentageSales: changePercentageSales,
};
