import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { con } from "../config/db";

const addProduct = (req: Request, res: Response, next: NextFunction) => {
  let { dealer_id, name, price, description } = req.body;
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;
  let query = `INSERT INTO product (dealer_id, name, image, price, description) VALUES (${dealer_id}, "${name}", "${image}", ${price}, "${description}")`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        return res.status(201).json({
          success: true,
          message: "تم اضافة المنتج بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const updateProducts = (req: Request, res: Response, next: NextFunction) => {
  let { name, price, description } = req.body;
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;
  let { id } = req.params;

  let query = `UPDATE product SET name="${name}", image="${image}", price=${price}, description="${description}" WHERE ID=${id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: "حدث خطأ ما, يرجى المحاولة لاحقا",
          error,
        });
      } else if (results) {
        if (results.imgae !== "No image") {
          fs.unlink(`uploads/${results.image}`, (error) => {
            if (error) throw error;
          });
        }
        return res.status(200).json({
          success: true,
          message: "تم تعديل المنتج بنجاح",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const deleteProduct = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `DELETE FROM product WHERE ID=${id}`;
  let select_image = `SELECT image FROM product WHERE ID=${id}`;

  try {
    con.query(select_image, (error: Error, image_result: any, fields: any) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "حدث خطأ ما يرجى المحاولة فيما بعد",
        });
      }
      if (image_result[0].image !== "No image") {
        fs.unlink(`uploads/${image_result[0].image}`, (error) => {
          if (error) throw error;
        });
      }
      con.query(query, (error: Error, results: any, fields: any) => {
        if (error) {
          return res.status(400).json({
            success: false,
            message: "حدث خطأ ما, يرجى المحاولة لاحقا",
            error,
          });
        } else if (results) {
          return res.status(200).json({
            success: true,
            message: "تم حذف المنتج بنجاح",
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
  let query = `SELECT p.ID, d.name AS dealer_name, p.name, p.image, p.price, p.created_at FROM product AS p INNER JOIN dealer AS d on d.ID=p.dealer_id`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
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
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getAllDealerProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { dealer_id } = req.params;

  let query = `SELECT ID, dealer_id, name, image, price, description FROM product WHERE dealer_id=${dealer_id}`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
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
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const searchProduct = (req: Request, res: Response, next: NextFunction) => {
  let { search_name } = req.params;

  let query = `SELECT ID, dealer_id, name, image, price, description FROM product WHERE name LIKE "${search_name}%"`;

  try {
    con.query(query, (error: Error, results: any, fields: any) => {
      if (error) {
        return res.status(400).json({
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
    return res.status(400).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};
export default {
  addProduct,
  updateProducts,
  deleteProduct,
  getAllProducts,
  getAllDealerProducts,
  searchProduct,
};
