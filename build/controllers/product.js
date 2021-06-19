"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var addProduct = function (req, res, next) {
    var _a = req.body, dealer_id = _a.dealer_id, name = _a.name, price = _a.price, description = _a.description;
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var query = "INSERT INTO product (dealer_id, name, image, price, description) VALUES (" + dealer_id + ", \"" + name + "\", \"" + image + "\", " + price + ", \"" + description + "\")";
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
                    message: "تم اضافة المنتج بنجاح",
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
var updateProducts = function (req, res, next) {
    var _a = req.body, name = _a.name, price = _a.price, description = _a.description;
    var image = "kiwi" + req.file.path.split("kiwi")[1];
    var id = req.params.id;
    var query_image = "SELECT image FROM product WHERE ID=" + id;
    var query = "UPDATE product SET name=\"" + name + "\", " + (req.file ? " image=\"" + image + "\"," : "") + " price=" + price + ", description=\"" + description + "\" WHERE ID=" + id;
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
                    message: "تم تعديل المنتج بنجاح",
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
var deleteProduct = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM product WHERE ID=" + id;
    var select_image = "SELECT image FROM product WHERE ID=" + id;
    try {
        // con.query(select_image, (error: Error, image_result: any, fields: any) => {
        //   if (error) {
        //     return res.status(500).json({
        //       success: false,
        //       message: "حدث خطأ ما يرجى المحاولة فيما بعد",
        //     });
        //   }
        //   if (image_result[0].image !== "No image") {
        //     fs.unlink(`uploads/${image_result[0].image}`, (error) => {
        //       if (error) throw error;
        //     });
        //   }
        // });
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
                    message: "تم حذف المنتج بنجاح",
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
var getAllProducts = function (req, res, next) {
    var limit = req.params.limit;
    var query = "SELECT p.ID, d.name AS dealer_name, p.name, p.image, p.price, p.created_at FROM product AS p INNER JOIN dealer AS d on d.ID=p.dealer_id LIMIT " + (limit ? limit : 10);
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
var getAllDealerProducts = function (req, res, next) {
    var _a = req.params, dealer_id = _a.dealer_id, limit = _a.limit;
    var query = "SELECT ID, dealer_id, name, image, price, description FROM product WHERE dealer_id=" + dealer_id + " LIMIT " + (limit ? limit : 10) + " ";
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
var searchProduct = function (req, res, next) {
    var _a = req.params, search_name = _a.search_name, type = _a.type, limit = _a.limit;
    var query = "SELECT p.ID, p.dealer_id, p.name AS product_name, p.image, p.price, p.description FROM product AS p INNER JOIN dealer AS d ON p.dealer_id=d.ID WHERE p.name LIKE \"%" + search_name + "%\" AND d.type=\"" + type + "\" LIMIT " + (limit ? limit : 50);
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
var getSampleProducts = function (req, res, next) {
    var query = "SELECT ID, dealer_id, name, image, price, description FROM product ORDER BY RAND() LIMIT 10";
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
    addProduct: addProduct,
    updateProducts: updateProducts,
    deleteProduct: deleteProduct,
    getAllProducts: getAllProducts,
    getAllDealerProducts: getAllDealerProducts,
    searchProduct: searchProduct,
    getSampleProducts: getSampleProducts,
};
