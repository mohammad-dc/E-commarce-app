"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var addCreditCard = function (req, res, next) {
    var _a = req.body, owner_id = _a.owner_id, owner_type = _a.owner_type, card_number = _a.card_number, expired_time = _a.expired_time, security_code = _a.security_code, zip_code = _a.zip_code;
    var query = "INSERT INTO credit (owner_id, owner_type, card_number, expired_time, security_code, zip_code) VALUSE (" + owner_id + ", \"" + owner_type + "\", \"" + card_number + "\", " + expired_time + ", \"" + security_code + "\", \"" + zip_code + "\")";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error
                });
            }
            else if (results) {
                return res.status(201).json({
                    success: true,
                    message: 'تم الاضافة بنجاح',
                });
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error
        });
    }
};
var deleteCreditCard = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM credit WHERE ID=" + id;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error
                });
            }
            else if (results) {
                return res.status(200).json({
                    success: true,
                    message: 'تم الحذف بنجاح',
                });
            }
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error
        });
    }
};
var getAllOwnerCreditCards = function (req, res, next) {
    var _a = req.params, owner_id = _a.owner_id, owner_type = _a.owner_type;
    var query = "SELECT ID, card_number, expired_time, security_code, zip_code FROM credit WHERE owner_id=" + owner_id + " AND owner_type=" + owner_type;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error
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
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error
        });
    }
};
var getAllTransitionCreditCards = function (req, res, next) {
    var owner_type = req.params.owner_type;
    var query = "SELECT ID, card_number, expired_time, security_code, zip_code FROM credit WHERE owner_type=" + owner_type;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                    error: error
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
        return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: error
        });
    }
};
exports.default = { addCreditCard: addCreditCard, deleteCreditCard: deleteCreditCard, getAllOwnerCreditCards: getAllOwnerCreditCards, getAllTransitionCreditCards: getAllTransitionCreditCards };
