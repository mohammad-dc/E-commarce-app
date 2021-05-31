"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var addTransition = function (req, res, next) {
    var name = req.body.name;
    var query = "INSERT INTO transition (name) VALUES (\"" + name + "\")";
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
var deleteTransition = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM transition WHERE id=" + id;
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
var updateTransition = function (req, res, next) {
    var id = req.params.id;
    var name = req.body.name;
    var query = "UPDATE transition SET name=\"" + name + "\" WHERE id=" + id;
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
var getAllTransitions = function (req, res, next) {
    var query = "SELECT ID, name FROM transition";
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
    addTransition: addTransition,
    deleteTransition: deleteTransition,
    updateTransition: updateTransition,
    getAllTransitions: getAllTransitions,
};
