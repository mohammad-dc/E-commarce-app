import express, { Request, Response, NextFunction } from "express";
import { con } from "../config/db";

const addTransitionPricing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { from_city, to_city, price } = req.body;
  let query = `INSERT INTO transition_pricing (from_city, to_city, price) VALUES ("${from_city}", "${to_city}", ${price})`;

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
          message: "تم الاضافة بنجاح",
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

const deleteTransitionPricing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;

  let query = `DELETE FROM transition_pricing WHERE id=${id}`;

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
          message: "تم الحذف بنجاح",
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

const updateTransitionPricing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;
  let { from_city, to_city, price } = req.body;

  let query = `UPDATE transition_pricing SET from_city="${from_city}", to_city="${to_city}", price=${price} WHERE id=${id}`;

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
          message: "تم التعديل بنجاح",
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

const getAllTransitionsPricing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query = `SELECT ID, from_city, to_city, price FROM transition_pricing`;

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

export default {
  addTransitionPricing,
  deleteTransitionPricing,
  updateTransitionPricing,
  getAllTransitionsPricing,
};
