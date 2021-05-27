"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
var stripe_1 = __importDefault(require("../helpers/stripe"));
var addOrder = function (req, res, next) {
    console.log(req.body);
    var _a = req.body, payment_method = _a.payment_method, product_id = _a.product_id, customer_id = _a.customer_id, quantity = _a.quantity, total_price = _a.total_price, address = _a.address, number = _a.number, exp_month = _a.exp_month, exp_year = _a.exp_year, cvc = _a.cvc;
    var query = "INSERT INTO orders(product_id, customer_id, quantity, total_price, payment_method, status, transition_price, address) VALUES(" + product_id + ", " + customer_id + ", " + quantity + ", " + total_price + ", " + payment_method + ", '\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644', 12, '" + address + "')";
    if (payment_method === 1) {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                });
            }
            return res.status(201).json({
                success: true,
                message: "تمت عملية الشراء",
            });
        });
    }
    else if (payment_method === 2) {
        db_1.con.query("SELECT stripe_id, email, name FROM customer WHERE ID=" + customer_id, function (error, customer_results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما يرجى المحاولة لاحقا",
                    error: error,
                });
            }
            else if (customer_results.length === 1) {
                stripe_1.default.createToken(number, exp_month, exp_year, cvc, function (error, token) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: "حدث خطأ ما يرجى المحاولة لاحقا",
                            error: error,
                        });
                    }
                    if (token) {
                        stripe_1.default.addCardToCustomer(customer_results[0].stripe_id, token.id);
                        db_1.con.query("SELECT total_price FROM product WHERE ID=" + product_id, function (error, product_results, fields) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, stripe_1.default.chargeCustomer((product_results[0].total_price * 1000).toString(), "usd", "buy for product", customer_results[0].stripe_id)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                });
            }
            else if (customer_results.length === 0) {
                stripe_1.default.createCustomer(customer_results[0].email, customer_results[0].name, function (error, customer) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: "حدث خطأ ما يرجى المحاولة لاحقا",
                            error: error,
                        });
                    }
                    stripe_1.default.createToken(number, exp_month, exp_year, cvc, function (error, token) {
                        if (error) {
                            return res.status(500).json({
                                success: false,
                                message: "حدث خطأ ما يرجى المحاولة لاحقا",
                                error: error,
                            });
                        }
                        if (token) {
                            stripe_1.default.addCardToCustomer(customer.id, token.id);
                            db_1.con.query("SELECT total_price FROM product WHERE ID=" + product_id, function (error, product_results, fields) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, stripe_1.default.chargeCustomer((product_results[0].total_price * 1000).toString(), "usd", "buy for product", customer.id)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                    });
                });
                db_1.con.query(query, function (error, results, fields) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                        });
                    }
                    return res.status(201).json({
                        success: true,
                        message: "تمت عملية الشراء",
                    });
                });
            }
        });
    }
};
var updateOrder = function (req, res, next) { };
var cancelOrder = function (req, res, next) {
    var order_id = req.params.order_id;
    var query = "UPDATE orders SET cancel='\u062A\u0645 \u0627\u0644\u0627\u0644\u063A\u0627\u0621' WHERE ID=" + order_id;
    db_1.con.query(query, function (error, results, fields) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
            });
        }
        return res.status(200).json({
            success: true,
            message: "تم الغاء الطلب",
        });
    });
};
var getAllOrders = function (req, res, next) {
    var query = "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, c.ID AS customer_id, c.name AS customer_name, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address AS order_address d.name AS dealer_name, d.address AS dealer_address FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID INNER JOIN dealer on p.dealer_id=d.ID";
    db_1.con.query(query, function (error, results, fields) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            });
        }
        return res.status(200).json({
            success: true,
            results: results,
        });
    });
};
var getUserOrders = function (req, res, next) {
    var customer_id = req.params.customer_id;
    var query = "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID WHERE c.ID=" + customer_id;
    db_1.con.query(query, function (error, results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
            });
        }
        return res.status(200).json({
            success: true,
            results: results,
        });
    });
};
var getOrdersStatus = function (req, res, next) {
    var month = req.params.month;
    var orders_query = "SELECT COUNT(ID) AS count FROM orders " + (month === "all" ? "" : "WHERE month(created_at)=" + month);
    var canceled_query = "SELECT COUNT(ID) AS count FROM orders WHERE status='\u062A\u0645 \u0627\u0644\u0627\u0644\u063A\u0627\u0621' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var shipped_query = "SELECT COUNT(ID) AS count FROM orders WHERE status='\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var delivered_query = "SELECT COUNT(ID) AS count FROM orders WHERE status='\u062A\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    db_1.con.query(orders_query, function (error, orders_results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error,
            });
        }
        db_1.con.query(canceled_query, function (error, canceled_results, field) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                    error: error,
                });
            }
            db_1.con.query(shipped_query, function (error, shipped_results, field) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message,
                        error: error,
                    });
                }
                db_1.con.query(delivered_query, function (error, delivered_results, field) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: error.message,
                            error: error,
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        canceled_orders_per: canceled_results[0].count === 0
                            ? 0
                            : Math.floor((canceled_results[0].count /
                                orders_results[0].count) *
                                100),
                        shipped_orders_per: shipped_results[0].count === 0
                            ? 0
                            : Math.floor((shipped_results[0].count / orders_results[0].count) *
                                100),
                        delivered_orders_per: delivered_results[0].count === 0
                            ? 0
                            : Math.floor((delivered_results[0].count /
                                orders_results[0].count) *
                                100),
                    });
                });
            });
        });
    });
};
var getDealerOrdersStatus = function (req, res, next) {
    var dealer_id = req.params.dealer_id;
    var month = req.params.month;
    var orders_query = "SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=" + dealer_id + " " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var canceled_query = "SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=" + dealer_id + " AND status='\u062A\u0645 \u0627\u0644\u0627\u0644\u063A\u0627\u0621' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var shipped_query = "SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=" + dealer_id + " AND status='\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var delivered_query = "SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=" + dealer_id + " AND status='\u062A\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    db_1.con.query(orders_query, function (error, orders_results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error,
            });
        }
        db_1.con.query(canceled_query, function (error, canceled_results, field) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                    error: error,
                });
            }
            db_1.con.query(shipped_query, function (error, shipped_results, field) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message,
                        error: error,
                    });
                }
                db_1.con.query(delivered_query, function (error, delivered_results, field) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: error.message,
                            error: error,
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        canceled_orders_per: canceled_results[0].count === 0
                            ? 0
                            : Math.floor((canceled_results[0].count /
                                orders_results[0].count) *
                                100),
                        shipped_orders_per: shipped_results[0].count === 0
                            ? 0
                            : Math.floor((shipped_results[0].count / orders_results[0].count) *
                                100),
                        delivered_orders_per: delivered_results[0].count === 0
                            ? 0
                            : Math.floor((delivered_results[0].count /
                                orders_results[0].count) *
                                100),
                    });
                });
            });
        });
    });
};
var getCustomerOrdersStatus = function (req, res, next) {
    var customer_id = req.params.customer_id;
    var month = req.params.month;
    var orders_query = "SELECT COUNT(ID) AS count FROM orders WHERE customer_id=" + customer_id + " " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var canceled_query = "SELECT COUNT(ID) AS count FROM orders WHERE customer_id=" + customer_id + " AND status='\u062A\u0645 \u0627\u0644\u0627\u0644\u063A\u0627\u0621' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var shipped_query = "SELECT COUNT(ID) AS count FROM orders WHERE customer_id=" + customer_id + " AND status='\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    var delivered_query = "SELECT COUNT(ID) AS count FROM orders WHERE customer_id=" + customer_id + " AND status='\u062A\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644' " + (month === "all" ? "" : "AND month(created_at)=" + month);
    db_1.con.query(orders_query, function (error, orders_results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
                error: error,
            });
        }
        db_1.con.query(canceled_query, function (error, canceled_results, field) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message,
                    error: error,
                });
            }
            db_1.con.query(shipped_query, function (error, shipped_results, field) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: error.message,
                        error: error,
                    });
                }
                db_1.con.query(delivered_query, function (error, delivered_results, field) {
                    if (error) {
                        return res.status(500).json({
                            success: false,
                            message: error.message,
                            error: error,
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        canceled_orders_per: canceled_results[0].count === 0
                            ? 0
                            : Math.floor((canceled_results[0].count /
                                orders_results[0].count) *
                                100),
                        shipped_orders_per: shipped_results[0].count === 0
                            ? 0
                            : Math.floor((shipped_results[0].count / orders_results[0].count) *
                                100),
                        delivered_orders_per: delivered_results[0].count === 0
                            ? 0
                            : Math.floor((delivered_results[0].count /
                                orders_results[0].count) *
                                100),
                    });
                });
            });
        });
    });
};
exports.default = {
    addOrder: addOrder,
    updateOrder: updateOrder,
    cancelOrder: cancelOrder,
    getAllOrders: getAllOrders,
    getUserOrders: getUserOrders,
    getOrdersStatus: getOrdersStatus,
    getDealerOrdersStatus: getDealerOrdersStatus,
    getCustomerOrdersStatus: getCustomerOrdersStatus,
};
