import express, { Request, Response, NextFunction } from "express";
import fs from "fs";
import { con } from "../config/db";

const addSliderImage = (req: Request, res: Response, next: NextFunction) => {
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;

  let query = `INSERT INTO slider_image (image) VALUES ("${image}")`;

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
          message: "تم اضافة الصورة بنجاح",
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

const deleteSliderImage = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;

  let query = `DELETE FROM slider_image WHERE ID=${id}`;

  try {
    con.query(
      `SELECT ID, image FROM slider_image WHERE id=${id}`,
      (error: Error, results: any, fields: any) => {
        if (error) throw error;
        else if (results) {
          fs.unlink(`uploads/${results[0].image}`, (error) => {
            if (error) throw error;
          });
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
                message: "تم حذف الصورة بنجاح",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const updateSliderImage = (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.params;
  let image = `kiwi${req.file.path.split("kiwi")[1]}`;

  let query = `UPDATE slider_image SET image="${image}" WHERE ID=${id}`;

  try {
    con.query(
      `SELECT ID, image FROM slider_image WHERE id=${id}`,
      (error: Error, results: any, fields: any) => {
        if (error) throw error;
        else if (results) {
          fs.unlink(`uploads/${results[0].image}`, (error) => {
            if (error) throw error;
          });
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
                message: "تم نعديل الصورة بنجاح",
              });
            }
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "حدث خطأ ما, يرجى المحاولة لاحقا",
      error,
    });
  }
};

const getAllSliderImages = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let query = `SELECT ID, image FROM slider_image`;

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
          slider: results,
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
  addSliderImage,
  deleteSliderImage,
  updateSliderImage,
  getAllSliderImages,
};
