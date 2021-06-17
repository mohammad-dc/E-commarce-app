import express, { Request, Response, NextFunction } from "express";
import { con } from "../config/db";
import Stripe from "../helpers/stripe";

const addOrder = (req: Request, res: Response, next: NextFunction) => {
  let {
    payment_method,
    product_id,
    customer_id,
    cart_id,
    quantity,
    total_price,
    address,
    number,
    name,
    exp_month,
    exp_year,
    cvc,
  } = req.body;

  let query = `INSERT INTO orders(product_id, customer_id, quantity, total_price, payment_method, status, transition_price, address) VALUES(${product_id}, ${customer_id}, ${quantity}, ${total_price}, ${payment_method}, 'قيد التوصيل', 12, '${address}')`;
  let query_cart = `DELETE FROM cart WHERE ID=${cart_id}`;

  if (payment_method === 1) {
    con.query(query, (error: Error, results: any, fields: any) => {
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
  } else if (payment_method === 2) {
    con.query(
      `SELECT stripe_id, email FROM customer WHERE ID=${customer_id}`,
      (error: Error, customer_results: any, fields: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "حدث خطأ ما يرجى المحاولة لاحقا",
            error,
          });
        } else if (
          customer_results.length === 1 &&
          customer_results[0].stripe_id
        ) {
          console.log("1");
          Stripe.createToken(
            number,
            exp_month,
            exp_year,
            cvc,
            (error, token) => {
              if (error) {
                return res.status(500).json({
                  success: false,
                  message: "حدث خطأ ما يرجى المحاولة لاحقا",
                  error,
                });
              }
              if (token) {
                Stripe.addCardToCustomer(
                  customer_results[0].stripe_id,
                  token.id
                );
                Stripe.chargeCustomer(
                  (total_price * 1000).toString(),
                  "usd",
                  "buy for product",
                  customer_results[0].stripe_id
                );
              }
            }
          );
        } else if (
          customer_results.length === 1 &&
          !customer_results[0].stripe_id
        ) {
          Stripe.createCustomer(
            customer_results[0].email,
            name,
            (error, customer) => {
              if (error) {
                return res.status(500).json({
                  success: false,
                  message: "حدث خطأ ما يرجى المحاولة لاحقا",
                  error,
                });
              }
              con.query(
                `UPDATE customer SET stripe_id='${customer.id}' WHERE ID=${customer_id}`
              );
              Stripe.createToken(
                number,
                exp_month,
                exp_year,
                cvc,
                (error, token) => {
                  if (error) {
                    return res.status(500).json({
                      success: false,
                      message: "حدث خطأ ما يرجى المحاولة لاحقا",
                      error,
                    });
                  }
                  if (token) {
                    Stripe.addCardToCustomer(customer.id, token.id);
                    Stripe.chargeCustomer(
                      (total_price * 1000).toString(),
                      "usd",
                      "buy for product",
                      customer.id
                    );
                  }
                }
              );
            }
          );
        }
        con.query(query, (error: Error, results: any, fields: any) => {
          if (error) {
            return res.status(500).json({
              success: false,
              message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
            });
          }
          con.query(query_cart, (error: Error, results: any, fields: any) => {
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
        });
      }
    );
  }
};

const updateOrder = (req: Request, res: Response, next: NextFunction) => {};

const cancelOrder = (req: Request, res: Response, next: NextFunction) => {
  let { order_id } = req.params;

  let query = `UPDATE orders SET cancel='تم الالغاء' WHERE ID=${order_id}`;

  con.query(query, (error: Error, results: any, fields: any) => {
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

const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  let query =
    "SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, c.ID AS customer_id, c.name AS customer_name, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address AS order_address, d.name AS dealer_name, d.address AS dealer_address, o.created_at FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID INNER JOIN dealer AS d on p.dealer_id=d.ID";

  con.query(query, (error: Error, results: any, fields: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      });
    }
    return res.status(200).json({
      success: true,
      results,
    });
  });
};

const getUserOrders = (req: Request, res: Response, next: NextFunction) => {
  let { customer_id } = req.params;
  let { month } = req.params;

  let query = `SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address, o.created_at FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID INNER JOIN customer AS c on o.customer_id=c.ID WHERE c.ID=${customer_id} ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;

  con.query(query, (error: Error, results: any, field: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
      });
    }
    return res.status(200).json({
      success: true,
      results,
    });
  });
};

const getDealerOrders = (req: Request, res: Response, next: NextFunction) => {
  let { dealer_id } = req.params;
  let { month } = req.params;
  let query = `SELECT o.ID, p.ID AS product_id, p.name AS product_name, p.image AS product_image, o.quantity, o.total_price, o.payment_method, o.status, o.transition_price, o.address FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE o.dealer_id=${dealer_id} ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;

  con.query(query, (error: Error, results: any, field: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "حدث خطأ ما, يرجى المحاولة فيما بعد",
      });
    }
    return res.status(200).json({
      success: true,
      results,
    });
  });
};

const getOrdersStatus = (req: Request, res: Response, next: NextFunction) => {
  let { month } = req.params;

  let orders_query = `SELECT COUNT(ID) AS count FROM orders ${
    month === "all" ? "" : `WHERE month(created_at)=${month}`
  }`;
  let canceled_query = `SELECT COUNT(ID) AS count FROM orders WHERE status='تم الالغاء' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let shipped_query = `SELECT COUNT(ID) AS count FROM orders WHERE status='قيد التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let delivered_query = `SELECT COUNT(ID) AS count FROM orders WHERE status='تم التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;

  con.query(orders_query, (error: Error, orders_results: any, field: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
    con.query(
      canceled_query,
      (error: Error, canceled_results: any, field: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
            error,
          });
        }
        con.query(
          shipped_query,
          (error: Error, shipped_results: any, field: any) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: error.message,
                error,
              });
            }
            con.query(
              delivered_query,
              (error: Error, delivered_results: any, field: any) => {
                if (error) {
                  return res.status(500).json({
                    success: false,
                    message: error.message,
                    error,
                  });
                }

                return res.status(200).json({
                  success: true,
                  canceled_orders_per:
                    canceled_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (canceled_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                  shipped_orders_per:
                    shipped_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (shipped_results[0].count / orders_results[0].count) *
                            100
                        ),
                  delivered_orders_per:
                    delivered_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (delivered_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                });
              }
            );
          }
        );
      }
    );
  });
};

const getDealerOrdersStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { dealer_id } = req.params;
  let { month } = req.params;

  let orders_query = `SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=${dealer_id} ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let canceled_query = `SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=${dealer_id} AND status='تم الالغاء' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let shipped_query = `SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=${dealer_id} AND status='قيد التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let delivered_query = `SELECT COUNT(o.ID) AS count FROM orders AS o INNER JOIN product AS p on o.product_id=p.ID WHERE p.dealer_id=${dealer_id} AND status='تم التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;

  con.query(orders_query, (error: Error, orders_results: any, field: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
    con.query(
      canceled_query,
      (error: Error, canceled_results: any, field: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
            error,
          });
        }
        con.query(
          shipped_query,
          (error: Error, shipped_results: any, field: any) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: error.message,
                error,
              });
            }
            con.query(
              delivered_query,
              (error: Error, delivered_results: any, field: any) => {
                if (error) {
                  return res.status(500).json({
                    success: false,
                    message: error.message,
                    error,
                  });
                }

                return res.status(200).json({
                  success: true,
                  canceled_orders_per:
                    canceled_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (canceled_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                  shipped_orders_per:
                    shipped_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (shipped_results[0].count / orders_results[0].count) *
                            100
                        ),
                  delivered_orders_per:
                    delivered_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (delivered_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                });
              }
            );
          }
        );
      }
    );
  });
};

const getCustomerOrdersStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { customer_id } = req.params;
  let { month } = req.params;

  let orders_query = `SELECT COUNT(ID) AS count FROM orders WHERE customer_id=${customer_id} ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let canceled_query = `SELECT COUNT(ID) AS count FROM orders WHERE customer_id=${customer_id} AND status='تم الالغاء' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let shipped_query = `SELECT COUNT(ID) AS count FROM orders WHERE customer_id=${customer_id} AND status='قيد التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;
  let delivered_query = `SELECT COUNT(ID) AS count FROM orders WHERE customer_id=${customer_id} AND status='تم التوصيل' ${
    month === "all" ? "" : `AND month(created_at)=${month}`
  }`;

  con.query(orders_query, (error: Error, orders_results: any, field: any) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        error,
      });
    }
    con.query(
      canceled_query,
      (error: Error, canceled_results: any, field: any) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
            error,
          });
        }
        con.query(
          shipped_query,
          (error: Error, shipped_results: any, field: any) => {
            if (error) {
              return res.status(500).json({
                success: false,
                message: error.message,
                error,
              });
            }
            con.query(
              delivered_query,
              (error: Error, delivered_results: any, field: any) => {
                if (error) {
                  return res.status(500).json({
                    success: false,
                    message: error.message,
                    error,
                  });
                }

                return res.status(200).json({
                  success: true,
                  canceled_orders_per:
                    canceled_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (canceled_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                  shipped_orders_per:
                    shipped_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (shipped_results[0].count / orders_results[0].count) *
                            100
                        ),
                  delivered_orders_per:
                    delivered_results[0].count === 0
                      ? 0
                      : Math.floor(
                          (delivered_results[0].count /
                            orders_results[0].count) *
                            100
                        ),
                });
              }
            );
          }
        );
      }
    );
  });
};

const getSumOrdersPrices = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { month } = req.params;

  let query = `SELECT SUM(total_price) AS profits FROM orders WHERE month(created_at)=${month}`;

  try {
    con.query(query, (error: Error, results: any, field: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      }
      return res.status(200).json({
        success: true,
        results,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error: err,
    });
  }
};

export default {
  addOrder,
  updateOrder,
  cancelOrder,
  getAllOrders,
  getUserOrders,
  getDealerOrders,
  getOrdersStatus,
  getDealerOrdersStatus,
  getCustomerOrdersStatus,
  getSumOrdersPrices,
};
