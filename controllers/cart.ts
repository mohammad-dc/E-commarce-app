import express, { Request, Response, NextFunction } from "express";
import { con } from "../config/db";

const addToCart = (req: Request, res: Response, next: NextFunction) => {
  let { product_id, customer_id, quantity, total_price } = req.body;

  let query = `INSERT INTO cart (product_id, customer_id, quantity, total_price) VALUES (${product_id}, ${customer_id}, ${quantity}, ${total_price})`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(201).json({
          success: true,
          message: "تم اضافة المنتج الى السلة بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const updateFromCart = (req: Request, res: Response, next: NextFunction) => {
  let { quantity, total_price } = req.body;
  let { id } = req.params;

  let query = `UPDATE cart SET quantity=${quantity}, total_price=${total_price} WHERE ID=${id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          message: "تمت التعديل بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const deleteFromCart = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `DELETE FROM cart WHERE ID=${id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          message: "تمت ازالة المنتج من السلة بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getCart = (req: Request, res: Response, next: NextFunction) => {
  let { customer_id } = req.params;

  let query = `SELECT c.ID, c.product_id, c.customer_id, c.quantity, c.total_price, p.name, p.image, p.price, p.description, d.phone AS dealer_phone, d.address AS dealer_address FROM cart AS c INNER JOIN product AS p ON c.product_id = p.ID INNER JOIN dealer as d ON p.dealer_id=d.ID WHERE c.customer_id=${customer_id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(200).json({
          success: true,
          results,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

export default { addToCart, updateFromCart, deleteFromCart, getCart };
