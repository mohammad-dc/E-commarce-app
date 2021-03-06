"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../config/db");
// const addOrder = (req: Request, res: Response, next: NextFunction) => {
//   let {
//     payment_method,
//     product_id,
//     customer_id,
//     cart_id,
//     quantity,
//     total_price,
//     address,
//     number,
//     name,
//     exp_month,
//     exp_year,
//     cvc,
//   } = req.body;
//   let query = `INSERT INTO orders(product_id, customer_id, quantity, total_price, payment_method, status, transition_price, address) VALUES(${product_id}, ${customer_id}, ${quantity}, ${total_price}, ${payment_method}, 'قيد التوصيل', 12, '${address}')`;
//   let query_cart = `DELETE FROM cart WHERE ID=${cart_id}`;
//   if (payment_method === 1) {
//     con.query(query, (error: Error, results: any, fields: any) => {
//       if (error) {
//         return res.status(500).json({
//           success: false,
//           message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
//           error,
//         });
//       }
//       return res.status(201).json({
//         success: true,
//         message: "تمت عملية الشراء",
//       });
//     });
//   } else if (payment_method === 2) {
//     con.query(
//       `SELECT stripe_id, email FROM customer WHERE ID=${customer_id}`,
//       (error: Error, customer_results: any, fields: any) => {
//         if (error) {
//           return res.status(500).json({
//             success: false,
//             message: "حدث خطأ ما يرجى المحاولة لاحقا",
//             error,
//           });
//         } else if (
//           customer_results.length === 1 &&
//           customer_results[0].stripe_id
//         ) {
//           console.log("1");
//           Stripe.createToken(
//             number,
//             exp_month,
//             exp_year,
//             cvc,
//             (error, token) => {
//               if (error) {
//                 return res.status(500).json({
//                   success: false,
//                   message: "حدث خطأ ما يرجى المحاولة لاحقا",
//                   error,
//                 });
//               }
//               if (token) {
//                 Stripe.addCardToCustomer(
//                   customer_results[0].stripe_id,
//                   token.id
//                 );
//                 Stripe.chargeCustomer(
//                   (total_price * 1000).toString(),
//                   "usd",
//                   "buy for product",
//                   customer_results[0].stripe_id
//                 );
//               }
//             }
//           );
//         } else if (
//           customer_results.length === 1 &&
//           !customer_results[0].stripe_id
//         ) {
//           Stripe.createCustomer(
//             customer_results[0].email,
//             name,
//             (error, customer) => {
//               if (error) {
//                 return res.status(500).json({
//                   success: false,
//                   message: "حدث خطأ ما يرجى المحاولة لاحقا",
//                   error,
//                 });
//               }
//               con.query(
//                 `UPDATE customer SET stripe_id='${customer.id}' WHERE ID=${customer_id}`
//               );
//               Stripe.createToken(
//                 number,
//                 exp_month,
//                 exp_year,
//                 cvc,
//                 (error, token) => {
//                   if (error) {
//                     return res.status(500).json({
//                       success: false,
//                       message: "حدث خطأ ما يرجى المحاولة لاحقا",
//                       error,
//                     });
//                   }
//                   if (token) {
//                     Stripe.addCardToCustomer(customer.id, token.id);
//                     Stripe.chargeCustomer(
//                       (total_price * 1000).toString(),
//                       "usd",
//                       "buy for product",
//                       customer.id
//                     );
//                   }
//                 }
//               );
//             }
//           );
//         }
//         con.query(query, (error: Error, results: any, fields: any) => {
//           if (error) {
//             return res.status(500).json({
//               success: false,
//               message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
//             });
//           }
//           con.query(query_cart, (error: Error, results: any, fields: any) => {
//             if (error) {
//               return res.status(500).json({
//                 success: false,
//                 message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
//                 error,
//               });
//             }
//             return res.status(201).json({
//               success: true,
//               message: "تمت عملية الشراء",
//             });
//           });
//         });
//       }
//     );
//   }
// };
var createOrder = function (req, res, next) {
    var _a = req.body, payment_method = _a.payment_method, product_id = _a.product_id, customer_id = _a.customer_id, cart_id = _a.cart_id, quantity = _a.quantity, total_price = _a.total_price, address = _a.address, transition_price = _a.transition_price;
    var query = "INSERT INTO orders(product_id, customer_id, quantity, total_price, payment_method, status, transition_price, address) VALUES(" + product_id + ", " + customer_id + ", " + quantity + ", " + total_price + ", " + payment_method + ", '\u0642\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644', " + transition_price + ", '" + address + "')";
    var query_cart_delete = "DELETE FROM cart WHERE ID=" + cart_id;
    try {
        db_1.con.query(query, function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                    error: error,
                });
            }
            db_1.con.query(query_cart_delete, function (error, results, fields) {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                        error: error,
                    });
                }
            });
            return res.status(201).json({
                success: true,
                message: "تمت عملية الشراء",
            });
        });
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
            error: e,
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
    var query = "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, c.ID AS customer_id, c.name AS customer_name, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address AS order_address, d.name AS dealer_name, d.address AS dealer_address, o.created_at FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID INNER JOIN dealer AS d on p.dealer_id=d.ID";
    db_1.con.query(query, function (error, results, fields) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة لاحقا",
                error: error,
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
    var month = req.params.month;
    var query = "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address, o.created_at FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID WHERE c.ID=" + customer_id + " " + (month === "all"
        ? ""
        : "AND month(o.created_at)=" + month + " AND year(o.created_at)=" + new Date().getFullYear());
    db_1.con.query(query, function (error, results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                error: error,
            });
        }
        return res.status(200).json({
            success: true,
            results: results,
        });
    });
};
var getDealerOrders = function (req, res, next) {
    var dealer_id = req.params.dealer_id;
    var month = req.params.month;
    var query = "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address, o.created_at FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=" + dealer_id + " " + (month === "all"
        ? ""
        : "AND month(o.created_at)=" + month + " AND year(o.created_at)=" + new Date().getFullYear());
    db_1.con.query(query, function (error, results, field) {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
                error: error,
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
var getSumOrdersPrices = function (req, res, next) {
    var month = req.params.month;
    var query = "SELECT SUM(total_price) AS profits FROM orders WHERE month(created_at)=" + month;
    try {
        db_1.con.query(query, function (error, results, field) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "حدث خطأ ما, يرجى المحاولة لاحقا",
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
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error: err,
        });
    }
};
exports.default = {
    createOrder: createOrder,
    updateOrder: updateOrder,
    cancelOrder: cancelOrder,
    getAllOrders: getAllOrders,
    getUserOrders: getUserOrders,
    getDealerOrders: getDealerOrders,
    getOrdersStatus: getOrdersStatus,
    getDealerOrdersStatus: getDealerOrdersStatus,
    getCustomerOrdersStatus: getCustomerOrdersStatus,
    getSumOrdersPrices: getSumOrdersPrices,
};
