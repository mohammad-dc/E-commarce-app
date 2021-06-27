"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var db_1 = require("../config/db");
var addSliderImage = function (req, res, next) {
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var query = "INSERT INTO slider_image (image) VALUES (\"" + image + "\")";
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
                    message: "تم اضافة الصورة بنجاح",
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
var deleteSliderImage = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM slider_image WHERE ID=" + id;
    try {
        db_1.con.query("SELECT ID, image FROM slider_image WHERE id=" + id, function (error, results, fields) {
            if (error)
                throw error;
            else if (results) {
                fs_1.default.unlink("uploads/" + results[0].image, function (error) {
                    if (error)
                        throw error;
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
                            message: "تم حذف الصورة بنجاح",
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
var updateSliderImage = function (req, res, next) {
    var id = req.params.id;
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var query = "UPDATE slider_image SET image=\"" + image + "\" WHERE ID=" + id;
    try {
        db_1.con.query("SELECT ID, image FROM slider_image WHERE id=" + id, function (error, results, fields) {
            if (error)
                throw error;
            else if (results) {
                fs_1.default.unlink("uploads/" + results[0].image, function (error) {
                    if (error)
                        throw error;
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
                            message: "تم نعديل الصورة بنجاح",
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
var getAllSliderImages = function (req, res, next) {
    var query = "SELECT ID, image FROM slider_image";
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
    addSliderImage: addSliderImage,
    deleteSliderImage: deleteSliderImage,
    updateSliderImage: updateSliderImage,
    getAllSliderImages: getAllSliderImages,
};
