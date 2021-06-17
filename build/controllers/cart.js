"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var addToCart = function (req, res, next) {
    var _a = req.body, product_id = _a.product_id, customer_id = _a.customer_id, quantity = _a.quantity, total_price = _a.total_price;
    var query = "INSERT INTO cart (product_id, customer_id, quantity, total_price) VALUES (" + product_id + ", " + customer_id + ", " + quantity + ", " + total_price + ")";
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
                    message: "تم اضافة المنتج الى السلة بنجاح",
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
var updateFromCart = function (req, res, next) {
    var _a = req.body, quantity = _a.quantity, total_price = _a.total_price;
    var id = req.params.id;
    var query = "UPDATE cart SET quantity=" + quantity + ", total_price=" + total_price + " WHERE ID=" + id;
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
                    message: "تمت التعديل بنجاح",
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
var deleteFromCart = function (req, res, next) {
    var id = req.params.id;
    var query = "DELETE FROM cart WHERE ID=" + id;
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
                    message: "تمت ازالة المنتج من السلة بنجاح",
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
var getCart = function (req, res, next) {
    var customer_id = req.params.customer_id;
    var query = "SELECT c.ID, c.customer_id, c.quantity, c.total_price, p.ID, p.name, p.image, p.price, p.description FROM cart AS c INNER JOIN product AS p ON c.product_id = p.ID WHERE c.customer_id=" + customer_id;
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
exports.default = { addToCart: addToCart, updateFromCart: updateFromCart, deleteFromCart: deleteFromCart, getCart: getCart };
