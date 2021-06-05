"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var createPrivacy = function (req, res, next) {
    var subject = req.body.subject;
    var query = "INSERT INTO privacy(subject) VALUES ('" + subject + "')";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
                    error: error,
                });
            }
            return res.status(201).json({
                success: true,
                message: "تمت الاضافة",
            });
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
            error: err,
        });
    }
};
var updatePrivacy = function (req, res, next) {
    var subject = req.body.subject;
    var query = "UPDATE privacy SET subject='" + subject + "'";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
                    error: error,
                });
            }
            return res.status(200).json({
                success: true,
                message: "تمت التعديل",
            });
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
            error: err,
        });
    }
};
var getPrivacy = function (req, res, next) {
    var query = "SELECT subject FROM privacy";
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
                    error: error,
                });
            }
            return res.status(200).json({
                success: true,
                results: results,
            });
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحالولة  فيما بعد",
            error: err,
        });
    }
};
exports.default = { createPrivacy: createPrivacy, updatePrivacy: updatePrivacy, getPrivacy: getPrivacy };
