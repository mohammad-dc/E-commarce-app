"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var addTransitionPricing = function (req, res, next) {
    var _a = req.body, from_city = _a.from_city, to_city = _a.to_city, price = _a.price;
    var query = "INSERT INTO transition_pricing (from_city, to_city, price) VALUES (\"" + from_city + "\", \"" + to_city + "\", " + price + ")";
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
                return res.status(201).json({
                    success: true,
                    message: "تم الاضافة بنجاح",
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
var deleteTransitionPricing = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM transition_pricing WHERE id=" + id;
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
var updateTransitionPricing = function (req, res, next) {
    var id = req.params.id;
    var _a = req.body, from_city = _a.from_city, to_city = _a.to_city, price = _a.price;
    var query = "UPDATE transition_pricing SET from_city=\"" + from_city + "\", to_city=\"" + to_city + "\", price=" + price + " WHERE id=" + id;
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
var getAllTransitionsPricing = function (req, res, next) {
    var query = "SELECT ID, from_city, to_city, price FROM transition_pricing";
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
exports.default = {
    addTransitionPricing: addTransitionPricing,
    deleteTransitionPricing: deleteTransitionPricing,
    updateTransitionPricing: updateTransitionPricing,
    getAllTransitionsPricing: getAllTransitionsPricing,
};
